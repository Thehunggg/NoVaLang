// Trình đọc front-matter YAML tối giản, đủ cho các trường phẳng của pipeline
// (id, version, status, tier[], role[], enforced_by, depends_on[], sources[]).
// KHÔNG phải parser YAML đầy đủ — chỉ xử lý scalar, inline array [a, b], và
// block array (dòng "- item").

export function extractFrontMatter(text) {
  if (!text.startsWith('---')) return { has: false, data: null };
  const nl = text.indexOf('\n');
  if (nl === -1) return { has: false, data: null };
  const end = text.indexOf('\n---', nl);
  if (end === -1) return { has: false, data: null };
  const raw = text.slice(nl + 1, end);
  return { has: true, data: parseSimpleYaml(raw), raw };
}

export function parseSimpleYaml(raw) {
  const data = {};
  const lines = raw.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith('#')) { i++; continue; }
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!m) { i++; continue; }
    const key = m[1];
    let val = m[2].replace(/\s+#.*$/, '').trim();
    if (val === '') {
      const arr = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        arr.push(stripScalar(lines[j].replace(/^\s*-\s+/, '')));
        j++;
      }
      data[key] = arr.length ? arr : '';
      i = arr.length ? j : i + 1;
      continue;
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      data[key] = inner === '' ? [] : inner.split(',').map((s) => stripScalar(s.trim()));
    } else {
      data[key] = stripScalar(val);
    }
    i++;
  }
  return data;
}

function stripScalar(s) {
  s = s.trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}
