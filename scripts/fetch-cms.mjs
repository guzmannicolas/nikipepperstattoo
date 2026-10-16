// Pulls Niki's published portfolio from the CMS before every build/dev run and writes it
// in the same shape the site has always used:
//   src/data/{tattoos,works,ceramics,murals}.json, src/data/categories.json
//   src/data/profile.json (her contact details: "Mi sitio" → Contacto in the CMS)
//   src/assets/{tattoos,works,ceramics,murals}/<subfolder>/<image>
// Both outputs are generated (gitignored). Edit content in the CMS, not here.
//
// Needs DIRECTUS_URL and DIRECTUS_TOKEN (Vercel env vars, or a local .env file).
// If the CMS is unreachable the build fails, so Vercel keeps serving the last good deploy.
import { mkdir, rm, writeFile } from 'node:fs/promises';
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

async function cms(p) {
  const res = await fetch(BASE + p, { headers: { Authorization: `Bearer ${TOKEN}` } });
  if (!res.ok) throw new Error(`[fetch-cms] GET ${p} -> ${res.status} ${await res.text()}`);
  return res;
}

const fields = [
  'id', 'section', 'slug', 'sort', 'featured', 'title_en', 'title_es', 'category_links.sort', 'category_links.portfolio_categories_id.key',
  'technique_en', 'technique_es', 'description_en', 'description_es', 'dimensions', 'year', 'price',
  'images.sort', 'images.directus_files_id.id', 'images.directus_files_id.filename_download',
  'images.directus_files_id.title',
].join(',');
const { data: items } = await (await cms(
  `/items/portfolio_items?limit=-1&sort=sort,id&fields=${fields}&filter[status][_eq]=published`,
)).json();

// Categories per section (tattoo styles, ceramic types, works series…), in the client's CMS order.
const { data: categoryRows } = await (await cms(
  '/items/portfolio_categories?limit=-1&sort=sort,id' +
  '&fields=section,key,name_en,name_es,description_en,description_es,show_in_filters',
)).json();
const categories = {};
for (const c of categoryRows) {
  (categories[c.section] ??= []).push({
    key: c.key,
    name: { en: c.name_en ?? c.key, es: c.name_es || c.name_en || c.key },
    description: c.description_en ? { en: c.description_en, es: c.description_es || c.description_en } : null,
    showInFilters: c.show_in_filters !== false,
  });
}
const nameOf = (section, key, lang) => categories[section]?.find((c) => c.key === key)?.name[lang] ?? key;

// Each item's category keys, in the order she linked them.
for (const item of items) {
  item.categories = [...(item.category_links ?? [])]
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
    .map((l) => l.portfolio_categories_id?.key)
    .filter(Boolean);
  item.series = item.section === 'works' ? (item.categories[0] ?? null) : null;
}

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
const catNames = (section, cats, lang) => cats.map((c) => nameOf(section, c, lang)).join(', ');
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
      category_en: catNames(item.section, cats, 'en'),
      category_es: catNames(item.section, cats, 'es'),
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

// Contact details (contact page, footer, data for Google). Without them the build stops, so
// Vercel keeps serving the last good deploy.
const { data: [p] } = await (await cms(
  '/items/site_profile?limit=1&fields=whatsapp,email,location_es,location_en,hours_es,hours_en,instagram_url,facebook_url,youtube_url',
)).json();
if (!p) {
  console.error('[fetch-cms] No "Mi sitio" (site_profile) for this site in the CMS: the contact details live there.');
  process.exit(1);
}
const both = (base) => (p[`${base}_es`] || p[`${base}_en`]
  ? { en: p[`${base}_en`] || p[`${base}_es`], es: p[`${base}_es`] || p[`${base}_en`] }
  : null);
const profile = {
  whatsapp: p.whatsapp?.replace(/\D/g, '') || null,
  email: p.email || null,
  location: both('location'),
  hours: both('hours'),
  instagram: p.instagram_url || null,
  facebook: p.facebook_url || null,
  youtube: p.youtube_url || null,
};

const json = (v) => JSON.stringify(v, null, 2) + '\n';
await mkdir(path.join(ROOT, 'src/data'), { recursive: true }); // only generated files live here, so git has no folder
await writeFile(path.join(ROOT, 'src/data/profile.json'), json(profile));
await writeFile(path.join(ROOT, 'src/data/tattoos.json'), json({ items: bySection.tattoos }));
await writeFile(path.join(ROOT, 'src/data/ceramics.json'), json({ items: bySection.ceramics }));
await writeFile(path.join(ROOT, 'src/data/works.json'), json(bySection.works));
await writeFile(path.join(ROOT, 'src/data/murals.json'), json(bySection.murals));
await writeFile(path.join(ROOT, 'src/data/categories.json'), json(categories));

console.log(`[fetch-cms] ${items.length} items, ${imageCount} images from ${BASE} (` +
  SECTIONS.map((s) => `${s}: ${bySection[s].length}`).join(', ') + ')');
