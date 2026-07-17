// Shared helpers cho pipeline /build-language. Không phụ thuộc npm ngoài.
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep, extname, basename, dirname } from 'node:path';

export function walk(dir, opts = {}) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    if (opts.skipDirs && opts.skipDirs.includes(name)) continue;
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walk(p, opts));
    else out.push(p);
  }
  return out;
}

export function readText(p) { return readFileSync(p, 'utf8'); }
export function readJson(p) { return JSON.parse(readFileSync(p, 'utf8')); }
export function toPosix(p) { return p.split(sep).join('/'); }
export function repoRel(p, root) { return toPosix(relative(root, p)); }

export { existsSync, extname, basename, dirname, join };
