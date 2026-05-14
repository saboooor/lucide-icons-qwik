import { mkdir, writeFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { icons as lucideIcons, IconNode } from 'lucide';

// -----------------------------
// 1. Detect deprecated icons
// -----------------------------
const types = readFileSync('./node_modules/lucide/dist/lucide.d.ts', 'utf8');
const deprecatedIcons = new Set<string>();
const regex = /@deprecated[\s\S]*?declare const (\w+)/g;

let match;
while ((match = regex.exec(types))) {
  deprecatedIcons.add(match[1]);
}

// -----------------------------
// 2. Normalize icons
// -----------------------------
const icons: Record<string, IconNode> = {};

for (const [name, icon] of Object.entries(lucideIcons)) {
  if (icons[name]) continue;
  icons[name] = icon;

  // avoid global collisions
  if (name === 'Infinity') {
    icons['InfinityIcon'] = icon;
    delete icons['Infinity'];
  }
}

// -----------------------------
// 3. SVG builder
// -----------------------------
function buildContent(icon: IconNode) {
  return icon
    .map(([tag, attrs]) => {
      const props = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${props} />`;
    })
    .join('');
}

// -----------------------------
// 4. Qwik icon template
// -----------------------------
function buildIconTemplate(name: string, content: string) {
  const deprecated = deprecatedIcons.has(name)
    ? `/**
 * @deprecated
 */`
    : '';

  return `
${deprecated}
import { component$ } from '@builder.io/qwik';
import { BaseIcon } from '../base-icon';

export const ${name} = component$(() => {
  return (
    <BaseIcon>
      ${content}
    </BaseIcon>
  );
});
`;
}

// -----------------------------
// 5. Build icons (Qwik files)
// -----------------------------
async function buildIcons() {
  const outDir = './lib/icons';
  await mkdir(outDir, { recursive: true });

  await Promise.all(
    Object.entries(icons).map(([name, icon]) => {
      const content = buildContent(icon);
      return writeFile(
        `${outDir}/${name}.qwik.mjs`,
        buildIconTemplate(name, content),
        'utf8'
      );
    })
  );
}

// -----------------------------
// 6. Build PURE ESM barrel (IMPORTANT)
// -----------------------------
async function buildBarrel() {
  const lines: string[] = [];

  lines.push('// AUTO-GENERATED FILE - DO NOT EDIT\n');

  for (const name of Object.keys(icons)) {
    lines.push(
      `export { ${name} } from './icons/${name}.qwik.mjs';`
    );
  }

  await writeFile('./lib/index.mjs', lines.join('\n'), 'utf8');
}

// -----------------------------
// 7. Run build
// -----------------------------
async function build() {
  await buildIcons();
  await buildBarrel();
}

build();