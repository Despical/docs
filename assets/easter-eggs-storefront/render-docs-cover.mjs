// Run from the docs root: node assets/easter-eggs-storefront/render-docs-cover.mjs
// Builds the hero image of the documentation overview from the template poster frames.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const posters = path.join(root, 'public/images/easter-eggs/posters');
const target = path.join(root, 'public/images/easter-eggs/cover.png');
const W = 1600, H = 800;

// Templates recorded from a longer camera distance sit lower in the frame.
const centers = { candy: 640, snowman: 640, ornament: 620, gingerbread: 600 };
const tiles = [
    ['golden-egg', 'Golden Egg', '#ff8fc8'], ['pearl', 'Pearl', '#5fd6ff'], ['pumpkin', 'Pumpkin', '#ffab40'],
    ['spring-rabbit', 'Spring Rabbit', '#ff8fc8'], ['starfish', 'Starfish', '#5fd6ff'], ['snow-globe', 'Snow Globe', '#7ff0b8'],
];
const size = 236, gap = 24, gridX = 764, gridY = 112;

const egg = (cx, cy, s, fill, opacity = 1) => `<path transform="translate(${cx} ${cy}) scale(${s})" d="M0 -26C13 -26 22 -6 22 8C22 21 12 28 0 28C-12 28 -22 21 -22 8C-22 -6 -13 -26 0 -26Z" fill="${fill}" fill-opacity="${opacity}"/>`;
const frames = tiles.map(([, label, color], i) => {
    const x = gridX + (i % 3) * (size + gap), y = gridY + Math.floor(i / 3) * (size + gap + 44);
    return `<rect x="${x - 5}" y="${y - 5}" width="${size + 10}" height="${size + 10}" rx="12" fill="#141126" stroke="#d6b06a" stroke-width="2"/>
     ${egg(x + 8, y + size + 30, .26, color)}<text x="${x + 20}" y="${y + size + 36}" fill="#efe9fb" font-size="18" font-weight="bold">${label}</text>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
 <defs>
  <linearGradient id="night" x2="1" y2="1"><stop stop-color="#181430"/><stop offset=".55" stop-color="#211c3f"/><stop offset="1" stop-color="#14302f"/></linearGradient>
  <linearGradient id="gold" x2="1"><stop stop-color="#c48a3e"/><stop offset=".5" stop-color="#ffe2a0"/><stop offset="1" stop-color="#c79049"/></linearGradient>
  <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#b9a8ff" stroke-opacity=".05"/></pattern>
 </defs>
 <rect width="${W}" height="${H}" fill="url(#night)"/><rect width="${W}" height="${H}" fill="url(#grid)"/>
 ${egg(120, 700, 2.2, '#5fd6ff', .07)}${egg(220, 755, 1.2, '#7ff0b8', .07)}${egg(690, 90, 1.4, '#ff8fc8', .07)}
 <g font-family="Verdana,DejaVu Sans,sans-serif">
  <text x="80" y="250" fill="#ffd27a" font-size="20" font-weight="bold" letter-spacing="4">PAPER PLUGIN</text>
  <text x="76" y="335" fill="#fff4e4" font-size="82" font-weight="bold">Easter</text>
  <text x="76" y="425" fill="#ffd27a" font-size="82" font-weight="bold">Eggs</text>
  <path d="M80 466H640" stroke="url(#gold)" stroke-opacity=".6"/>
  <text x="80" y="514" fill="#d3cde6" font-size="25">Seasonal treasure hunts for your world.</text>
  ${[['6', 'hunts'], ['20', 'eggs'], ['20', 'effects']].map(([n, t], i) => `<rect x="${80 + i * 186}" y="560" width="168" height="74" rx="14" fill="#1a1631" stroke="#ffd27a" stroke-opacity=".45"/><text x="${104 + i * 186}" y="608" fill="#ffd27a" font-size="30" font-weight="bold">${n}</text><text x="${104 + i * 186 + (n.length * 22) + 10}" y="606" fill="#efe9fb" font-size="20">${t}</text>`).join('')}
  ${frames}
 </g>
</svg>`;

const composites = [];
for (const [i, [id]] of tiles.entries()) {
    const x = gridX + (i % 3) * (size + gap), y = gridY + Math.floor(i / 3) * (size + gap + 44);
    const side = 520, top = Math.max(0, Math.min(1080 - side, (centers[id] ?? 580) - side / 2));
    const tile = await sharp(path.join(posters, `${id}.jpg`)).extract({ left: (1920 - side) / 2, top, width: side, height: side })
        .resize(size, size, { kernel: 'lanczos3' })
        .composite([{ input: Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="8" fill="#fff"/></svg>`), blend: 'dest-in' }])
        .png().toBuffer();
    composites.push({ input: tile, left: x, top: y });
}

await fs.writeFile(path.join(root, 'assets/easter-eggs-storefront/docs-cover.svg'), svg);
await sharp(Buffer.from(svg)).composite(composites).png({ compressionLevel: 9 }).toFile(target);
console.log(`cover.png: ${((await fs.stat(target)).size / 1048576).toFixed(2)} MiB`);
