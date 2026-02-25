#!/usr/bin/env node
/**
 * tools/add-images.mjs
 *
 * Detecta imágenes nuevas en src/assets/ que no estén registradas en los JSONs
 * y las agrega automáticamente después de mostrarte un preview.
 *
 * Uso: node tools/add-images.mjs
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname, basename, dirname } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ACCEPTED_EXTS = new Set(['.avif', '.jpg', '.jpeg', '.png', '.gif']);

function toSlug(filename) {
  return basename(filename, extname(filename))
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function toTitleCase(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function scanDir(dirPath) {
  try {
    return readdirSync(dirPath).filter(f => ACCEPTED_EXTS.has(extname(f).toLowerCase()));
  } catch {
    return [];
  }
}

function scanDirRecursive(dirPath, relativeTo) {
  const results = [];
  try {
    const entries = readdirSync(dirPath);
    for (const entry of entries) {
      const full = join(dirPath, entry);
      const stat = statSync(full);
      if (stat.isDirectory()) {
        const sub = scanDirRecursive(full, relativeTo);
        results.push(...sub);
      } else if (ACCEPTED_EXTS.has(extname(entry).toLowerCase())) {
        results.push(full.replace(relativeTo, '').replace(/\\/g, '/'));
      }
    }
  } catch {}
  return results;
}

function ask(rl, question) {
  return new Promise(resolve => rl.question(question, resolve));
}

function readJSON(path) {
  return JSON.parse(readFileSync(path, 'utf-8'));
}

function writeJSON(path, data) {
  writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf-8');
}

// ─── Colors ───────────────────────────────────────────────────────────────────

const c = {
  green:  s => `\x1b[32m${s}\x1b[0m`,
  yellow: s => `\x1b[33m${s}\x1b[0m`,
  cyan:   s => `\x1b[36m${s}\x1b[0m`,
  bold:   s => `\x1b[1m${s}\x1b[0m`,
  dim:    s => `\x1b[2m${s}\x1b[0m`,
  red:    s => `\x1b[31m${s}\x1b[0m`,
};

// ─── Tattoos ──────────────────────────────────────────────────────────────────

function checkTattoos() {
  const jsonPath = join(ROOT, 'src/data/tattoos.json');
  const data = readJSON(jsonPath);
  const existing = new Set(
    data.items.flatMap(item => item.images.map(img => basename(img.path)))
  );

  const assetDir = join(ROOT, 'src/assets/tattoos');
  const files = scanDir(assetDir).filter(f => f !== 'README.md');
  const newFiles = files.filter(f => !existing.has(f));

  if (newFiles.length === 0) return { type: 'tattoos', newEntries: [], data, jsonPath };

  const maxId = Math.max(...data.items.map(i => Number(i.id) || 0), 0);
  const newEntries = newFiles.map((file, idx) => {
    const slug = toSlug(file);
    const title = toTitleCase(slug);
    return {
      id: maxId + idx + 1,
      slug,
      title: { en: title, es: title },
      description: '',
      price: '',
      images: [
        {
          filename: title,
          path: `/src/assets/tattoos/${file}`,
          alt: title,
        },
      ],
      category: '',
      category_es: '',
    };
  });

  return { type: 'tattoos', newEntries, data, jsonPath };
}

// ─── Ceramics ─────────────────────────────────────────────────────────────────

function checkCeramics() {
  const jsonPath = join(ROOT, 'src/data/ceramics.json');
  const data = readJSON(jsonPath);
  const existing = new Set(
    data.items.flatMap(item => item.images.map(img => basename(img.path)))
  );

  const assetDir = join(ROOT, 'src/assets/ceramics');
  const files = scanDir(assetDir);
  const newFiles = files.filter(f => !existing.has(f));

  if (newFiles.length === 0) return { type: 'ceramics', newEntries: [], data, jsonPath };

  const maxId = Math.max(...data.items.map(i => Number(i.id) || 0), 0);
  const newEntries = newFiles.map((file, idx) => {
    const slug = toSlug(file);
    const title = basename(file, extname(file)); // preserve original casing for ceramics
    return {
      id: maxId + idx + 1,
      slug,
      title: { en: title, es: title },
      description: '',
      price: '',
      images: [
        {
          filename: title,
          path: `/src/assets/ceramics/${file}`,
          alt: title,
        },
      ],
      category: '',
      category_es: '',
    };
  });

  return { type: 'ceramics', newEntries, data, jsonPath };
}

// ─── Works ────────────────────────────────────────────────────────────────────

function checkWorks() {
  const jsonPath = join(ROOT, 'src/data/works.json');
  const data = readJSON(jsonPath);
  const existing = new Set(data.map(item => item.image));

  const assetDir = join(ROOT, 'src/assets/works');
  const allFiles = scanDirRecursive(assetDir, ROOT);
  // allFiles are like: /src/assets/works/echoes_from_the_deep/river-rose.avif

  const newFiles = allFiles.filter(f => !existing.has(f));

  if (newFiles.length === 0) return { type: 'works', newEntries: [], data, jsonPath };

  const currentYear = new Date().getFullYear();

  const newEntries = newFiles.map(relPath => {
    const filename = basename(relPath);
    const slug = toSlug(filename);
    const title = toTitleCase(slug);
    // Extract series from directory name
    const parts = relPath.split('/');
    const seriesDirName = parts.length >= 3 ? parts[parts.length - 2] : 'unknown';
    // Map directory name to series key (strip trailing number/special chars)
    const series = seriesDirName.replace(/,.*$/, '').replace(/\s+/g, '_').toLowerCase();

    return {
      id: slug,
      title: { en: title, es: title },
      series,
      technique: '',
      technique_es: '',
      dimensions: '',
      year: currentYear,
      image: relPath,
      price: '',
    };
  });

  return { type: 'works', newEntries, data, jsonPath };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n' + c.bold('🖼  add-images — detector de imágenes nuevas') + '\n');

  const results = [checkTattoos(), checkCeramics(), checkWorks()];
  const withNew = results.filter(r => r.newEntries.length > 0);

  if (withNew.length === 0) {
    console.log(c.green('✓ Todo está al día. No se encontraron imágenes nuevas.\n'));
    process.exit(0);
  }

  // ── Preview ──
  console.log(c.bold('Imágenes nuevas detectadas:\n'));

  for (const { type, newEntries } of withNew) {
    console.log(c.cyan(`  📁 ${type.toUpperCase()} — ${newEntries.length} imagen(es) nueva(s):`));
    for (const entry of newEntries) {
      const imgPath = entry.images ? entry.images[0].path : entry.image;
      console.log(c.dim(`     · ${basename(imgPath)}`));
      console.log(`       slug:       ${entry.slug || entry.id}`);
      console.log(`       title (en): ${entry.title.en}`);
      console.log(`       title (es): ${entry.title.es}`);
      if (entry.category !== undefined) {
        console.log(c.yellow(`       category:   [vacío — completar a mano en el JSON]`));
      }
      if (entry.series !== undefined) {
        console.log(`       series:     ${entry.series}`);
        console.log(`       year:       ${entry.year}`);
      }
      console.log('');
    }
  }

  console.log(c.yellow('⚠  Los campos "category", "title.es", "description" y "price" quedan vacíos.'));
  console.log(c.yellow('   Recordá completarlos en el JSON antes de hacer commit.\n'));

  // ── Confirm ──
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = await ask(rl, c.bold('¿Agregar estas entradas al JSON? (s/n): '));
  rl.close();

  if (answer.trim().toLowerCase() !== 's') {
    console.log(c.red('\n✗ Cancelado. No se modificó nada.\n'));
    process.exit(0);
  }

  // ── Write ──
  let total = 0;
  for (const { type, newEntries, data, jsonPath } of withNew) {
    if (newEntries.length === 0) continue;

    if (type === 'works') {
      data.push(...newEntries);
    } else {
      data.items.push(...newEntries);
    }

    writeJSON(jsonPath, data);
    total += newEntries.length;
    console.log(c.green(`✓ ${newEntries.length} entrada(s) agregadas a ${type}.json`));
  }

  console.log(c.bold(`\n✅ Listo. ${total} entrada(s) en total.\n`));
  console.log(c.dim('Próximos pasos:'));
  console.log(c.dim('  1. Editar el JSON para completar category, title.es, description, price'));
  console.log(c.dim('  2. npm run build  →  verificar que todo compila'));
  console.log(c.dim('  3. git add . && git commit -m "feat(content): agregar nuevas fotos"'));
  console.log(c.dim('  4. git push origin dev\n'));
}

main().catch(err => {
  console.error(c.red('\n✗ Error: ' + err.message));
  process.exit(1);
});
