#!/usr/bin/env node
/**
 * Sync shared JSON assets to mobile/novalang_flutter/assets/shared/.
 *
 * Sources:
 *   shared/config/*.json
 *   shared/i18n/*.json
 *   shared/generated/*.json  (curriculum)
 *   shared/content/*.json    (seed content, flat only)
 *
 * Run: npm run sync:flutter-assets
 */

import { copyFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const SOURCE_DIRS = [
  { label: 'shared/config', dir: path.join(ROOT, 'shared', 'config') },
  { label: 'shared/i18n', dir: path.join(ROOT, 'shared', 'i18n') },
  { label: 'shared/generated', dir: path.join(ROOT, 'shared', 'generated') },
  { label: 'shared/content', dir: path.join(ROOT, 'shared', 'content'), flatOnly: true },
];

const DEST_DIR = path.join(
  ROOT,
  'mobile',
  'novalang_flutter',
  'assets',
  'shared',
);

async function listJsonFiles(dir, { flatOnly = false } = {}) {
  const entries = await readdir(dir);
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry);
    const info = await stat(fullPath);
    if (info.isFile() && entry.endsWith('.json')) {
      files.push(fullPath);
    } else if (info.isDirectory() && !flatOnly) {
      // skip nested dirs for content; generated is flat
    }
  }
  return files.sort();
}

async function main() {
  await mkdir(DEST_DIR, { recursive: true });

  let copied = 0;
  const copiedFiles = [];

  for (const { label, dir, flatOnly } of SOURCE_DIRS) {
    let files = [];
    try {
      files = await listJsonFiles(dir, { flatOnly });
    } catch {
      console.log(`[skip] ${label}: directory missing`);
      continue;
    }
    if (files.length === 0) {
      console.log(`[skip] ${label}: no JSON files found`);
      continue;
    }

    for (const sourcePath of files) {
      const fileName = path.basename(sourcePath);
      const destPath = path.join(DEST_DIR, fileName);
      await copyFile(sourcePath, destPath);
      copied += 1;
      copiedFiles.push({
        source: path.relative(ROOT, sourcePath),
        dest: path.relative(ROOT, destPath),
      });
      console.log(
        `[copy] ${path.relative(ROOT, sourcePath)} -> ${path.relative(ROOT, destPath)}`,
      );
    }
  }

  console.log('');
  console.log(`Done. Copied ${copied} JSON file(s) to assets/shared/.`);
  if (copiedFiles.length > 0) {
    console.log('Files synced:');
    for (const file of copiedFiles) {
      console.log(`  - ${file.source}`);
    }
  }
}

main().catch((error) => {
  console.error('sync-shared-assets failed:', error);
  process.exit(1);
});
