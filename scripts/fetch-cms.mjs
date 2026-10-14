// Pulls Niki's published portfolio from the CMS before every build/dev run and writes it
// in the same shape the site has always used:
//   src/data/{tattoos,works,ceramics,murals}.json
//   src/assets/{tattoos,works,ceramics,murals}/<subfolder>/<image>
// Both outputs are generated (gitignored). Edit content in the CMS, not here.
//
// Needs DIRECTUS_URL and DIRECTUS_TOKEN (Vercel env vars, or a local .env file).
// If the CMS is unreachable the build fails, so Vercel keeps serving the last good deploy.
import { mkdir, rm, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

if (existsSync('.env') && typeof process.loadEnvFile === 'function') process.loadEnvFile('.env');

const BASE = process.env.DIRECTUS_URL?.replace(/\/$/, '');
const TOKEN = process.env.DIRECTUS_TOKEN;
if (!BASE || !TOKEN) {
  console.error('[fetch-cms] DIRECTUS_URL and DIRECTUS_TOKEN must be set (Vercel env vars or .env).');
  process.exit(1);
}

const SECTIONS = ['tattoos', 'works', 'ceramics', 'murals'];
const ROOT = process.cwd();
const labelsEs = JSON.parse(await readFile(path.join(ROOT, 'src/data/category-labels.es.json'), 'utf8'));

async function cms(p) {
  const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!res.ok) throw new Error(`[fetch-cms] GET ${p} -> ${res.status} ${await res.text()}`);
  return res;
}

const fields = [
  'id', 'section', 'slug', 'sort', 'featured', 'title_en', 'title_es', 'series', 'series_ref.key', 'categories',
  'technique_en', 'technique_es', 'description_en', 'description_es', 'dimensions', 'year', 'price',
  'images.sort', 'images.directus_files_id.id', 'images.directus_files_id.filename_download',
  'images.directus_files_id.title',
].join(',');
const { data: items } = await (await cms(
  `/items/portfolio_items?limit=-1&sort=sort,id&fields=${fields}&filter[status][_eq]=published`,
)).json();

// Series (filter buttons + "About the series" on the works page), in the client's CMS order.
const { data: seriesRows } = await (await cms(
  '/items/portfolio_series?limit=-1&sort=sort,id&fields=key,name_en,name_es,description_en,description_es',
)).json();
const series = seriesRows.map((s) => ({
  key: s.key,
  name: { en: s.name_en ?? s.key, es: s.name_es || s.name_en || s.key },
  description: s.description_en ? { en: s.description_en, es: s.description_es || s.description_en } : null,
}));
for (const item of items) item.series = item.series_ref?.key ?? item.series ?? null;

// Fresh output folders for the CMS-managed sections only (home/, addimage/ stay untouched).
for (const s of SECTIONS) await rm(path.join(ROOT, 'src/assets', s), { recursive: true, force: true });

// Lowercase extensions: the page globs only match .jpg/.avif/..., not .JPG from phones.
const safe = (s) => String(s).replace(/[\/\\]/g, '-').replace(/\.[^.]+$/, (ext) => ext.toLowerCase());
const usedPaths = new Set();
const SUPPORTED = ['.avif', '.jpg', '.jpeg', '.png', '.webp', '.gif'];

function subfolder(item) {
  const cats = item.categories ?? [];
  if (item.section === 'tattoos') return cats.includes('coverups') ? 'coverups' : (cats[0] ?? 'other');
  if (item.section === 'ceramics') return cats[0] ?? 'other';
  if (item.section === 'works') return item.series ?? 'other';
  return '';
}

async function download(item) {
  const images = [...(item.images ?? [])]
    .filter((im) => im.directus_files_id)
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  const out = [];
  for (const { directus_files_id: file } of images) {
    let name = safe(file.filename_download);
    let url = `/assets/${file.id}`;
    // Formats Astro can't optimize (e.g. .heic, .tiff) are converted to JPG by the CMS.
    if (!SUPPORTED.includes(path.extname(name))) {
      name = name.replace(/\.[^.]*$/, '') + '.jpg';
      url += '?format=jpg';
    }
    let rel = path.posix.join('/src/assets', item.section, subfolder(item), name);
    if (usedPaths.has(rel)) rel = rel.replace(/([^/]+)$/, `${file.id.slice(0, 8)}-$1`);
    let bytes;
    try {
      bytes = Buffer.from(await (await cms(url)).arrayBuffer());
    } catch (err) {
      if (!url.includes('?format=')) throw err; // CMS down: fail the build, keep the live site
      console.warn(`[fetch-cms] skipping image "${file.filename_download}" of item ${item.id}: ${err.message}`);
      continue;
    }
    usedPaths.add(rel);
    await mkdir(path.dirname(path.join(ROOT, rel)), { recursive: true });
    await writeFile(path.join(ROOT, rel), bytes);
    out.push({ path: rel, title: file.title || path.parse(file.filename_download).name });
  }
  return out;
}

const title = (i) => ({ en: i.title_en ?? '', es: i.title_es || i.title_en || '' });
const catsEs = (cats) => cats.map((c) => labelsEs[c] ?? c).join(', ');
const bySection = Object.fromEntries(SECTIONS.map((s) => [s, []]));
let imageCount = 0;

for (const item of items) {
  if (!bySection[item.section]) {
    console.warn(`[fetch-cms] skipping item ${item.id}: unknown section "${item.section}"`);
    continue;
  }
  const images = await download(item);
  imageCount += images.length;
  if (!images.length) console.warn(`[fetch-cms] item ${item.id} "${item.title_en}" has no images`);
  const cats = item.categories ?? [];
  const list = bySection[item.section];

  if (item.section === 'tattoos' || item.section === 'ceramics') {
    list.push({
      id: list.length + 1,
      slug: item.slug,
      featured: !!item.featured,
      title: title(item),
      description: item.description_en ?? '',
      price: item.price ?? '',
      images: images.map((im) => ({ filename: im.title, path: im.path, alt: im.title })),
      category: cats.join(', '),
      category_es: catsEs(cats),
    });
  } else if (item.section === 'works') {
    list.push({
      id: item.slug,
      featured: !!item.featured,
      title: title(item),
      series: item.series ?? '',
      technique: item.technique_en ?? '',
      technique_es: item.technique_es || item.technique_en || '',
      dimensions: item.dimensions ?? '',
      year: item.year,
      image: images[0]?.path ?? '',
      price: item.price ?? '',
    });
  } else if (item.section === 'murals') {
    list.push({ id: item.slug, featured: !!item.featured, title: title(item), year: item.year, image: images[0]?.path ?? '' });
  }
}

const json = (v) => JSON.stringify(v, null, 2) + '\n';
await writeFile(path.join(ROOT, 'src/data/tattoos.json'), json({ items: bySection.tattoos }));
await writeFile(path.join(ROOT, 'src/data/ceramics.json'), json({ items: bySection.ceramics }));
await writeFile(path.join(ROOT, 'src/data/works.json'), json(bySection.works));
await writeFile(path.join(ROOT, 'src/data/murals.json'), json(bySection.murals));
await writeFile(path.join(ROOT, 'src/data/series.json'), json(series));

console.log(`[fetch-cms] ${items.length} items, ${imageCount} images from ${BASE} (` +
  SECTIONS.map((s) => `${s}: ${bySection[s].length}`).join(', ') + ')');
