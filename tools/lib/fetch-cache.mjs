// Tải có cache vào tools/cache/ (đã gitignore). Node >=18 có sẵn fetch toàn cục.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';

export const CACHE = join(process.cwd(), 'tools', 'cache');

export async function fetchCached(url, cacheName, { json = false, force = false } = {}) {
  const dest = join(CACHE, cacheName);
  if (!force && existsSync(dest)) {
    const raw = readFileSync(dest, 'utf8');
    return json ? JSON.parse(raw) : raw;
  }
  mkdirSync(dirname(dest), { recursive: true });
  if (typeof fetch !== 'function') throw new Error('fetch không có (cần Node >=18)');
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} -> HTTP ${res.status}`);
  const text = await res.text();
  writeFileSync(dest, text);
  return json ? JSON.parse(text) : text;
}
