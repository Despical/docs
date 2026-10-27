// Run from the docs root: node assets/eat-everything-storefront/render.mjs [panel ...]
// Draws the Eat Everything storefront panels. Static panels embed the cropped in-game chat screenshots in
// public/images/eat-everything/chat at native pixel size, unless a scale is given.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'assets/eat-everything-storefront');
const media = path.join(root, 'public/images/eat-everything');
const output = path.join(media, 'storefront');
const only = process.argv.slice(2);
const wanted = name => only.length === 0 || only.includes(name);

await fs.mkdir(output, { recursive: true });

const C = {
    title: '#fff1dc', accent: '#ffb347', body: '#e3d3c0', muted: '#b39f8a', line: '#e8b06a',
    green: '#76f5a4', aqua: '#7fffe1', red: '#ff7777', yellow: '#ffd166', blue: '#91d7e3',
};

const defs = `<defs>
 <linearGradient id="night" x2="1" y2="1"><stop stop-color="#1b1410"/><stop offset=".55" stop-color="#271a12"/><stop offset="1" stop-color="#1a2a22"/></linearGradient>
 <linearGradient id="surface" x2="1" y2="1"><stop stop-color="#33241a"/><stop offset="1" stop-color="#26301f"/></linearGradient>
 <linearGradient id="code" x2="1" y2="1"><stop stop-color="#15100d"/><stop offset="1" stop-color="#17201b"/></linearGradient>
 <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#ffd9a0" stroke-opacity=".05"/></pattern>
</defs>`;

const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const svg = (h, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${h}" viewBox="0 0 1280 ${h}">${defs}<g font-family="Verdana,DejaVu Sans,sans-serif">${content}</g></svg>`;
const background = h => `<rect width="1280" height="${h}" rx="24" fill="url(#night)"/><rect width="1280" height="${h}" rx="24" fill="url(#grid)"/>`;
const panel = h => `${background(h)}<rect x="24" y="24" width="1232" height="${h - 48}" rx="25" fill="#2a1e15" fill-opacity=".45" stroke="#ffcf8a" stroke-opacity=".18"/><path d="M80 162H1200" stroke="${C.line}" stroke-opacity=".3"/>`;
const heading = (title, subtitle) => `<text x="640" y="97" text-anchor="middle" fill="${C.title}" font-size="41" font-weight="bold">${esc(title)}</text><text x="640" y="140" text-anchor="middle" fill="${C.body}" font-size="20">${esc(subtitle)}</text>`;
const footer = (y, text) => `<text x="640" y="${y}" text-anchor="middle" fill="${C.accent}" font-size="17" font-weight="bold" letter-spacing=".5">${esc(text)}</text>`;
const frame = (x, y, w, h) => `<rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="9" fill="#120d0a" stroke="#d6a45e" stroke-width="2"/><rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" fill="#120d0a"/>`;
const card = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#surface)" stroke="#ffcf8a" stroke-opacity=".28"/>`;
const chip = (x, y, text, color = C.body, w) => {
    const width = w ?? Math.round(text.length * 9.2 + 30);
    return { width, markup: `<rect x="${x}" y="${y}" width="${width}" height="36" rx="18" fill="#1d1510" stroke="${color}" stroke-opacity=".55"/><text x="${x + width / 2}" y="${y + 24}" text-anchor="middle" fill="${color}" font-size="15">${esc(text)}</text>` };
};
const chipRow = (y, items, color, x0 = 64, maxX = 1216, gap = 10) => {
    let x = x0, line = y, out = '';
    for (const item of items) {
        const probe = chip(0, 0, item, color);
        if (x + probe.width > maxX) { x = x0; line += 46; }
        out += chip(x, line, item, color).markup;
        x += probe.width + gap;
    }
    return out;
};
const centeredChips = (y, items, color) => {
    const widths = items.map(item => chip(0, 0, item, color).width);
    const total = widths.reduce((sum, w) => sum + w, 0) + (items.length - 1) * 10;
    let x = (1280 - total) / 2, out = '';
    items.forEach((item, i) => { out += chip(x, y, item, color).markup; x += widths[i] + 10; });
    return out;
};

// Panels are rendered at twice the layout size. Screenshots are enlarged with nearest-neighbour by an exact
// factor so every game pixel stays a sharp 2x2 block instead of being smoothed by the rasterizer.
const RESOLUTION = 2;
async function shot(id, { scale = 1, trim } = {}) {
    const file = path.join(media, 'chat', `${id}.png`);
    let image = sharp(file);
    const meta = await image.metadata();
    const width = trim ?? meta.width;
    if (trim) image = image.extract({ left: 0, top: 0, width: trim, height: meta.height });
    const w = Math.round(width * scale), h = Math.round(meta.height * scale);
    const png = scale === 1
        ? await image.resize(width * RESOLUTION, meta.height * RESOLUTION, { kernel: 'nearest' }).png().toBuffer()
        : await image.resize(w * RESOLUTION, h * RESOLUTION, { kernel: 'lanczos3' }).png().toBuffer();
    return { w, h, href: `data:image/png;base64,${png.toString('base64')}` };
}
async function shotFrame(id, x, y, caption, options) {
    const s = await shot(id, options);
    return `${frame(x, y, s.w, s.h)}<image x="${x}" y="${y}" width="${s.w}" height="${s.h}" href="${s.href}"/>${caption ? `<text x="${x + s.w / 2}" y="${y + s.h + 36}" text-anchor="middle" fill="${C.blue}" font-size="18" font-family="Consolas,DejaVu Sans Mono,monospace">${esc(caption)}</text>` : ''}`;
}

async function still(name, h, content) {
    if (!wanted(name)) return;
    const markup = svg(h, content);
    await fs.writeFile(path.join(source, `${name}.svg`), markup);
    const target = path.join(output, `${name}.png`);
    await sharp(Buffer.from(markup), { density: 72 * RESOLUTION }).png({ compressionLevel: 9, palette: false }).toFile(target);
    console.log(`${name}.png: ${((await fs.stat(target)).size / 1048576).toFixed(2)} MiB`);
}

const icon = await fs.readFile(path.join(root, 'assets/eat-everything-storefront/icon.svg'), 'utf8');
const iconHref = `data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`;

const icons = {
    stick: `<g transform="rotate(-38)"><rect x="-6" y="-34" width="12" height="68" rx="6" fill="#c28a4e"/><rect x="-6" y="-34" width="5" height="68" rx="2.5" fill="#d9a468"/><rect x="-4" y="-10" width="14" height="6" rx="3" fill="#b27a3f" transform="rotate(30)"/></g>`,
    soup: `<path d="M-30 -2H30C30 22 14 34 0 34C-14 34 -30 22 -30 -2Z" fill="#b8713f"/><path d="M-30 -2H30C30 22 14 34 0 34C-14 34 -30 22 -30 -2Z" fill="#000" opacity=".12"/><ellipse cx="0" cy="-2" rx="30" ry="8" fill="#e0a070"/><ellipse cx="0" cy="-3" rx="25" ry="5.5" fill="#d96a4a"/><path d="M-11 -18C-16 -26 -6 -30 -11 -40M3 -18C-2 -26 8 -30 3 -40M17 -18C12 -26 22 -30 17 -40" stroke="#e3d3c0" stroke-opacity=".7" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    apple: `<path d="M0 -20C-12 -34 -34 -22 -30 2C-27 24 -10 34 0 28C10 34 27 24 30 2C34 -22 12 -34 0 -20Z" fill="#e0453a"/><path d="M-16 -8C-20 0 -18 10 -12 16" stroke="#ff8a7a" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/><rect x="-2" y="-34" width="5" height="16" rx="2.5" fill="#7a4f2a"/><path d="M3 -28C14 -40 28 -34 28 -34C26 -22 12 -22 3 -28Z" fill="#6bd47a"/>`,
};
// Cover: shown above the description on Hub and SpigotMC; BuiltByBit displays its own.
const orbit = (x, y, icon, tint, scale = .8) => `<circle cx="${x}" cy="${y}" r="42" fill="#1a120d" stroke="${tint}" stroke-opacity=".75" stroke-width="2"/><g transform="translate(${x} ${y + 2}) scale(${scale})">${icons[icon]}</g>`;
await still('cover', 560, `${background(560)}
 <defs><radialGradient id="glow"><stop stop-color="#ffb347" stop-opacity=".38"/><stop offset=".6" stop-color="#ffb347" stop-opacity=".1"/><stop offset="1" stop-color="#ffb347" stop-opacity="0"/></radialGradient></defs>
 <rect x="24" y="24" width="1232" height="512" rx="25" fill="#2a1e15" fill-opacity=".45" stroke="#ffcf8a" stroke-opacity=".18"/>
 <circle cx="260" cy="280" r="230" fill="url(#glow)"/>
 <circle cx="260" cy="280" r="168" fill="#1a120d" fill-opacity=".7" stroke="#ffcf8a" stroke-opacity=".28" stroke-width="2"/>
 <circle cx="260" cy="280" r="190" fill="none" stroke="#ffcf8a" stroke-opacity=".12" stroke-dasharray="3 9" stroke-width="2"/>
 <image x="130" y="150" width="260" height="260" href="${iconHref}"/>
 ${orbit(112, 142, 'stick', '#c28a4e')}${orbit(414, 130, 'apple', '#e0453a')}${orbit(430, 426, 'soup', '#d96a4a')}
 <text x="556" y="256" fill="${C.title}" font-size="74" font-weight="bold">Eat Everything</text>
 <rect x="564" y="278" width="132" height="6" rx="3" fill="${C.accent}"/>
 <text x="562" y="338" fill="${C.accent}" font-size="31" font-weight="bold">Turn any Minecraft item into food.</text>
 <text x="562" y="380" fill="${C.body}" font-size="19">Nutrition, effects, leftovers, cooldowns and commands for every item.</text>
 ${chipRow(414, ['Effects', 'Leftovers', 'Cooldowns', 'Permissions', 'Commands'], C.line, 562, 1216)}
 <rect x="562" y="474" width="440" height="34" rx="17" fill="#1d1510" stroke="${C.accent}" stroke-opacity=".6"/>
 <text x="782" y="497" text-anchor="middle" fill="${C.accent}" font-size="15" font-weight="bold" letter-spacing=".8">PAPER AND FORKS  -  1.21.11+  -  JAVA 25</text>`);

// Three example foods that show the range of what one entry can do.
const pips = (x, y, filled, total = 5) => Array.from({ length: total }, (_, i) => `<circle cx="${x + i * 30}" cy="${y}" r="10" fill="${i < filled ? C.accent : '#2c211a'}" stroke="${i < filled ? '#ffd9a0' : '#6a5646'}" stroke-opacity=".7"/>`).join('');
const stat = (x, y, label, value, color = C.title) => `<text x="${x}" y="${y}" fill="${C.muted}" font-size="15">${esc(label)}</text><text x="${x + 296}" y="${y}" text-anchor="end" fill="${color}" font-size="16" font-weight="bold">${esc(value)}</text>`;
const food = (x, icon, title, material, tint, hunger, rows, tag, tagColor) => `${card(x, 192, 368, 392)}
 <rect x="${x}" y="192" width="368" height="116" rx="14" fill="${tint}" fill-opacity=".14"/>
 <circle cx="${x + 70}" cy="250" r="44" fill="#1a120d" stroke="${tint}" stroke-opacity=".8" stroke-width="2"/>
 <g transform="translate(${x + 70} 252)">${icons[icon]}</g>
 <text x="${x + 134}" y="246" fill="${C.title}" font-size="25" font-weight="bold">${esc(title)}</text>
 <text x="${x + 134}" y="274" fill="${C.muted}" font-size="14" letter-spacing="1.2">${esc(material)}</text>
 <text x="${x + 28}" y="346" fill="${C.muted}" font-size="14">Hunger</text>
 ${pips(x + 120, 342, hunger)}
 <path d="M${x + 28} 370H${x + 340}" stroke="${C.line}" stroke-opacity=".22"/>
 ${rows.map(([label, value, color], i) => stat(x + 28, 402 + i * 34, label, value, color)).join('')}
 ${chip(x + 28, 534, tag, tagColor, 312).markup}`;
await still('anything', 630, `${panel(630)}${heading('Eat literally anything', 'One entry in food-components.yml turns any item, tool or block into food.')}
 ${food(64, 'stick', 'Golden Stick', 'STICK', '#c28a4e', 3, [['Saturation', '4'], ['Eating time', '1.2 s'], ['Regeneration II', '50% chance', C.green], ['Always edible', 'yes', C.aqua]], 'Heals while you chew', C.green)}
 ${food(456, 'soup', 'Healing Soup', 'MUSHROOM_STEW', '#d96a4a', 3, [['Saturation', '7.2'], ['Eating time', '2.0 s'], ['Regeneration II', '6 seconds', C.green], ['Leaves behind', 'Empty Bowl', C.yellow]], 'Leaves a bowl behind', C.yellow)}
 ${food(848, 'apple', 'Warp Apple', 'APPLE', '#e0453a', 2, [['Random teleport', '64 blocks', C.aqua], ['Cooldown', '300 s', C.yellow], ['Permission', 'server.vip', C.red], ['Runs command', 'on every bite', C.green]], 'Teleports and cools down', C.aqua)}`);

// Live editing screenshots.
await still('editing', 720, `${background(720)}${heading('Edit the item in your hand', 'Change any food value with a command and see the result instantly.')}<path d="M80 162H1200" stroke="${C.line}" stroke-opacity=".3"/>
 ${await shotFrame('saturation', 34, 204, '/ee saturation 3.5', { trim: 588 })}
 ${await shotFrame('eating-time', 656, 204, '/ee eatseconds 5.33', { trim: 588 })}
 ${await shotFrame('edible', 34, 460, '/ee edible false', { trim: 588 })}
 ${await shotFrame('nutrition', 656, 460, '/ee nutrition 2', { trim: 588 })}`);

// Inspect panel next to a short explanation.
const point = (y, color, title, text) => `<circle cx="760" cy="${y}" r="7" fill="${color}"/><text x="784" y="${y + 6}" fill="${C.title}" font-size="19" font-weight="bold">${esc(title)}</text><text x="784" y="${y + 30}" fill="${C.body}" font-size="15">${esc(text)}</text>`;
await still('info', 580, `${panel(580)}${heading('Inspect any item', '/ee info shows everything about the food in your hand.')}
 ${await shotFrame('info', 64, 220)}
 ${point(236, C.aqua, 'Every value at a glance', 'Nutrition, saturation, eating time and sound.')}
 ${point(318, C.green, 'Effects with their chance', 'Duration, level and probability of each effect.')}
 ${point(400, C.yellow, 'Copy it as a /give command', 'One click puts the exact item on your clipboard.')}
 ${footer(548, 'THE FASTEST WAY TO DEBUG A FOOD')}`);

// Help screens, scaled to fit side by side.
await still('help', 510, `${panel(510)}${heading('Help that guides you', 'Hover for details, click to run, and read what every option means.')}
 ${await shotFrame('help', 52, 204, 'Paged command guide', { scale: 0.9 })}
 ${await shotFrame('help-general', 652, 204, 'Plain-language option reference', { scale: 0.9 })}`);

// A YAML entry with callouts.
const yaml = [
    ['k', 'food:'], ['k', '  golden-stick:'], ['', '    item: ', 'v', 'STICK'], ['k', '    components:'],
    ['', '      nutrition: ', 'n', '6'], ['', '      saturation: ', 'n', '4'], ['', '      eat-seconds: ', 'n', '1.2'],
    ['k', '      effects:'], ['', "        '1':"], ['', '          name: ', 'v', 'REGENERATION'],
    ['', '          amplifier: ', 'n', '1'], ['', '          probability: ', 'n', '0.5'],
    ['k', '      conditions:'], ['', '        name: ', 's', '"&#FFAA00Golden Stick"'],
    ['k', '      converts-to:'], ['', '        material: ', 'v', 'BOWL'],
    ['k', '      commands:'], ['', '        - ', 's', '"give %player% diamond 1"'],
];
const tone = { k: C.accent, v: C.aqua, n: C.green, s: C.yellow };
const code = yaml.map((parts, i) => {
    const y = 226 + i * 25;
    if (parts.length === 2) return `<text x="96" y="${y}" fill="${tone[parts[0]] ?? C.body}" font-size="16" font-family="Consolas,DejaVu Sans Mono,monospace" xml:space="preserve">${esc(parts[1])}</text>`;
    return `<text x="96" y="${y}" fill="${C.body}" font-size="16" font-family="Consolas,DejaVu Sans Mono,monospace" xml:space="preserve">${esc(parts[1])}<tspan fill="${tone[parts[2]]}">${esc(parts[3])}</tspan></text>`;
}).join('');
const callout = (y, color, title, body, snippet) => `<rect x="760" y="${y}" width="456" height="112" rx="12" fill="#1d1510" stroke="${color}" stroke-opacity=".5"/><rect x="760" y="${y + 18}" width="5" height="34" rx="2" fill="${color}"/><text x="784" y="${y + 38}" fill="${color}" font-size="19" font-weight="bold">${esc(title)}</text><text x="784" y="${y + 64}" fill="${C.body}" font-size="14">${esc(body)}</text><rect x="784" y="${y + 76}" width="408" height="26" rx="6" fill="#120d0a" stroke="${color}" stroke-opacity=".25"/><text x="798" y="${y + 94}" fill="${C.blue}" font-size="13" font-family="Consolas,DejaVu Sans Mono,monospace">${esc(snippet)}</text>`;
await still('config', 730, `${panel(730)}${heading('Define it once in YAML', 'Reusable foods that apply to every matching item on the server.')}
 <rect x="64" y="190" width="640" height="${yaml.length * 25 + 46}" rx="14" fill="url(#code)" stroke="#ffcf8a" stroke-opacity=".3"/>
 ${code}
 ${callout(190, C.green, 'Effects with a chance', 'Each effect rolls its own probability.', 'probability: 0.5')}
 ${callout(318, C.yellow, 'Exact matching', 'Match by name, lore, amount or enchantments.', 'enchantments: [ "SHARPNESS:3" ]')}
 ${callout(446, C.aqua, 'Leftover items', 'Leave a bowl, a bottle or anything else behind.', 'converts-to: { material: BOWL }')}
 ${callout(574, C.red, 'Commands and permissions', 'Run commands and lock foods behind a node.', 'permission: "server.vip"')}`);

// Feature grid.
const feature = (x, y, color, title, lines) => `${card(x, y, 368, 150)}<rect x="${x}" y="${y + 18}" width="5" height="40" rx="2" fill="${color}"/><text x="${x + 24}" y="${y + 46}" fill="${C.title}" font-size="21" font-weight="bold">${esc(title)}</text>${lines.map((line, i) => `<text x="${x + 24}" y="${y + 80 + i * 24}" fill="${C.body}" font-size="15">${esc(line)}</text>`).join('')}`;
await still('features', 560, `${panel(560)}${heading('Everything a food needs', 'Reusable, permission-aware and easy to tune.')}
 ${feature(64, 190, C.green, 'Potion effects', ['Duration, level, icon and particles.', 'Every effect has its own chance.'])}
 ${feature(456, 190, C.yellow, 'Exact matching', ['Name, lore, amount and enchantments.', 'A plain stick can stay a stick.'])}
 ${feature(848, 190, C.aqua, 'Leftover items', ['A bowl after soup, a bottle after', 'a drink, or any item you design.'])}
 ${feature(64, 366, C.accent, 'Cooldowns', ['The hotbar overlay shows when the', 'food can be used again.'])}
 ${feature(456, 366, C.red, 'Permissions', ['Lock any food behind your own', 'permission node.'])}
 ${feature(848, 366, C.blue, 'Commands', ['Run console or player commands on', 'every bite, with placeholders.'])}`);

// Quick start with four numbered steps.
const step = (x, number, title, lines, color) => `${card(x, 196, 276, 270)}<circle cx="${x + 48}" cy="252" r="26" fill="#1d1510" stroke="${color}" stroke-width="2"/><text x="${x + 48}" y="261" text-anchor="middle" fill="${color}" font-size="26" font-weight="bold">${number}</text><text x="${x + 24}" y="318" fill="${C.title}" font-size="21" font-weight="bold">${esc(title)}</text>${lines.map((line, i) => `<text x="${x + 24}" y="${352 + i * 26}" fill="${line.startsWith('/') ? C.blue : C.body}" font-size="15" ${line.startsWith('/') ? 'font-family="Consolas,DejaVu Sans Mono,monospace"' : ''}>${esc(line)}</text>`).join('')}`;
await still('start', 500, `${panel(500)}${heading('Up and running in minutes', 'Four steps from an empty plugins folder to your first food.')}
 ${step(64, 1, 'Install', ['Place the JAR in your', 'plugins folder and', 'restart the server.'], C.accent)}
 ${step(364, 2, 'Prototype', ['Hold any item and run', '/ee nutrition 6', '/ee effect add speed 200 1'], C.green)}
 ${step(664, 3, 'Define', ['Add a food to', 'food-components.yml', 'and run /ee reload.'], C.aqua)}
 ${step(964, 4, 'Share', ['Hand it out with', '/ee item <id>', 'or from a command.'], C.yellow)}`);

// Section divider for marketplaces without [hr] support.
if (wanted('divider')) {
    const divider = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="16" viewBox="0 0 800 16"><defs><linearGradient id="d"><stop stop-color="#ffb347" stop-opacity="0"/><stop offset=".15" stop-color="#ffb347" stop-opacity=".75"/><stop offset=".85" stop-color="#76f5a4" stop-opacity=".75"/><stop offset="1" stop-color="#76f5a4" stop-opacity="0"/></linearGradient></defs><rect x="0" y="7" width="800" height="2" rx="1" fill="url(#d)"/><circle cx="400" cy="8" r="5" fill="#ffb347"/></svg>`;
    await fs.writeFile(path.join(source, 'divider.svg'), divider);
    await sharp(Buffer.from(divider), { density: 72 * RESOLUTION }).png().toFile(path.join(output, 'divider.png'));
    console.log('divider.png');
}
