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

async function shot(id, { scale = 1 } = {}) {
    const file = path.join(media, 'chat', `${id}.png`);
    const meta = await sharp(file).metadata();
    const w = Math.round(meta.width * scale), h = Math.round(meta.height * scale);
    const png = await sharp(file).resize(w, h, { kernel: scale === 1 ? 'nearest' : 'lanczos3' }).png().toBuffer();
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
    await sharp(Buffer.from(markup)).png({ compressionLevel: 9, palette: false }).toFile(target);
    console.log(`${name}.png: ${((await fs.stat(target)).size / 1048576).toFixed(2)} MiB`);
}

const icon = await fs.readFile(path.join(root, 'assets/eat-everything-storefront/icon.svg'), 'utf8');
const iconHref = `data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}`;

// Cover: shown above the description on Hub and SpigotMC; BuiltByBit displays its own.
await still('cover', 520, `${background(520)}
 <rect x="24" y="24" width="1232" height="472" rx="25" fill="#2a1e15" fill-opacity=".45" stroke="#ffcf8a" stroke-opacity=".18"/>
 <image x="86" y="110" width="300" height="300" href="${iconHref}"/>
 <text x="450" y="228" fill="${C.title}" font-size="78" font-weight="bold">Eat Everything</text>
 <text x="454" y="284" fill="${C.accent}" font-size="30" font-weight="bold">Turn any Minecraft item into food.</text>
 <text x="454" y="326" fill="${C.body}" font-size="19">Nutrition, effects, leftovers, cooldowns and commands for every item.</text>
 ${chipRow(366, ['Any item', 'Effects', 'Leftovers', 'Cooldowns', 'Permissions', 'Commands'], C.line, 454, 1216)}
 ${footer(452, 'PAPER 1.21.11 - 26.3   -   JAVA 25   -   /EE COMMANDS')}`);

// Three example foods that show the range of what one entry can do.
const stat = (x, y, label, value, color = C.body) => `<text x="${x}" y="${y}" fill="${C.muted}" font-size="15">${esc(label)}</text><text x="${x + 290}" y="${y}" text-anchor="end" fill="${color}" font-size="16" font-weight="bold">${esc(value)}</text>`;
const food = (x, title, material, rows) => `${card(x, 196, 360, 330)}
 <text x="${x + 24}" y="246" fill="${C.title}" font-size="24" font-weight="bold">${esc(title)}</text>
 <text x="${x + 24}" y="272" fill="${C.muted}" font-size="14" letter-spacing="1">${esc(material)}</text>
 <path d="M${x + 24} 292H${x + 336}" stroke="${C.line}" stroke-opacity=".25"/>
 ${rows.map(([label, value, color], i) => stat(x + 24, 328 + i * 36, label, value, color)).join('')}`;
await still('anything', 620, `${panel(620)}${heading('Eat literally anything', 'One entry in food-components.yml turns any item, tool or block into food.')}
 ${food(64, 'Golden Stick', 'STICK', [['Nutrition', '6'], ['Saturation', '4'], ['Eating time', '1.2 s'], ['Regeneration II', '50% chance', C.green], ['Always edible', 'yes', C.aqua]])}
 ${food(460, 'Healing Soup', 'MUSHROOM_STEW', [['Nutrition', '6'], ['Saturation', '7.2'], ['Eating time', '2.0 s'], ['Regeneration II', '6 seconds', C.green], ['Leaves behind', 'Empty Bowl', C.yellow]])}
 ${food(856, 'Warp Apple', 'APPLE', [['Random teleport', '64 blocks', C.aqua], ['Cooldown', '300 s', C.yellow], ['Always edible', 'yes', C.aqua], ['Permission', 'server.vip', C.red], ['Runs command', 'on every bite', C.green]])}
 ${footer(592, 'ANY ITEM - ANY VALUE - ONE ENTRY')}`);

// Live editing screenshots.
await still('editing', 860, `${panel(860)}${heading('Edit the item in your hand', 'Change any food value with a command and see the result instantly.')}
 ${await shotFrame('saturation', 36, 200, '/ee saturation 3.5')}
 ${await shotFrame('eating-time', 644, 200, '/ee eatseconds 5.33')}
 ${await shotFrame('edible', 36, 462, '/ee edible false')}
 ${await shotFrame('nutrition', 644, 462, '/ee nutrition 2')}
 ${footer(824, 'NO CONFIGURATION NEEDED - PERFECT FOR PROTOTYPING')}`);

// Inspect panel next to a short explanation.
const point = (y, color, title, text) => `<circle cx="760" cy="${y}" r="7" fill="${color}"/><text x="784" y="${y + 6}" fill="${C.title}" font-size="19" font-weight="bold">${esc(title)}</text><text x="784" y="${y + 30}" fill="${C.body}" font-size="15">${esc(text)}</text>`;
await still('info', 580, `${panel(580)}${heading('Inspect any item', '/ee info shows everything about the food in your hand.')}
 ${await shotFrame('info', 64, 220)}
 ${point(236, C.aqua, 'Every value at a glance', 'Nutrition, saturation, eating time and sound.')}
 ${point(318, C.green, 'Effects with their chance', 'Duration, level and probability of each effect.')}
 ${point(400, C.yellow, 'Copy it as a /give command', 'One click puts the exact item on your clipboard.')}
 ${footer(548, 'THE FASTEST WAY TO DEBUG A FOOD')}`);

// Help screens, scaled to fit side by side.
await still('help', 560, `${panel(560)}${heading('Help that guides you', 'Hover for details, click to run, and read what every option means.')}
 ${await shotFrame('help', 52, 204, 'Paged command guide', { scale: 0.9 })}
 ${await shotFrame('help-general', 652, 204, 'Plain-language option reference', { scale: 0.9 })}
 ${footer(526, 'ONLY THE COMMANDS YOU MAY USE ARE SHOWN')}`);

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
const callout = (y, color, title, text) => `<rect x="760" y="${y}" width="456" height="74" rx="12" fill="#1d1510" stroke="${color}" stroke-opacity=".5"/><text x="784" y="${y + 30}" fill="${color}" font-size="18" font-weight="bold">${esc(title)}</text><text x="784" y="${y + 54}" fill="${C.body}" font-size="14">${esc(text)}</text>`;
await still('config', 760, `${panel(760)}${heading('Define it once in YAML', 'Reusable foods that apply to every matching item on the server.')}
 <rect x="64" y="190" width="640" height="${yaml.length * 25 + 46}" rx="14" fill="url(#code)" stroke="#ffcf8a" stroke-opacity=".3"/>
 ${code}
 ${callout(196, C.green, 'Effects with a chance', 'Each effect rolls its own probability.')}
 ${callout(286, C.yellow, 'Exact matching', 'Match by name, lore, amount or enchantments.')}
 ${callout(376, C.aqua, 'Leftover items', 'Leave a bowl, a bottle or anything else behind.')}
 ${callout(466, C.red, 'Commands and permissions', 'Run commands and lock foods behind a node.')}
 ${footer(728, 'COMMENTED CONFIGURATION - /EE RELOAD APPLIES IT')}`);

// Feature grid.
const feature = (x, y, color, title, lines) => `${card(x, y, 368, 150)}<rect x="${x}" y="${y + 18}" width="5" height="40" rx="2" fill="${color}"/><text x="${x + 24}" y="${y + 46}" fill="${C.title}" font-size="21" font-weight="bold">${esc(title)}</text>${lines.map((line, i) => `<text x="${x + 24}" y="${y + 80 + i * 24}" fill="${C.body}" font-size="15">${esc(line)}</text>`).join('')}`;
await still('features', 590, `${panel(590)}${heading('Everything a food needs', 'Reusable, permission-aware and easy to tune.')}
 ${feature(64, 190, C.green, 'Potion effects', ['Duration, level, icon and particles.', 'Every effect has its own chance.'])}
 ${feature(456, 190, C.yellow, 'Exact matching', ['Name, lore, amount and enchantments.', 'A plain stick can stay a stick.'])}
 ${feature(848, 190, C.aqua, 'Leftover items', ['A bowl after soup, a bottle after', 'a drink, or any item you design.'])}
 ${feature(64, 366, C.accent, 'Cooldowns', ['The hotbar overlay shows when the', 'food can be used again.'])}
 ${feature(456, 366, C.red, 'Permissions', ['Lock any food behind your own', 'permission node.'])}
 ${feature(848, 366, C.blue, 'Commands', ['Run console or player commands on', 'every bite, with placeholders.'])}
 ${footer(562, 'PAPER 1.21.11 - 26.3   -   JAVA 25   -   PLACEHOLDERAPI OPTIONAL')}`);

// Section divider for marketplaces without [hr] support.
if (wanted('divider')) {
    const divider = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="16" viewBox="0 0 800 16"><defs><linearGradient id="d"><stop stop-color="#ffb347" stop-opacity="0"/><stop offset=".15" stop-color="#ffb347" stop-opacity=".75"/><stop offset=".85" stop-color="#76f5a4" stop-opacity=".75"/><stop offset="1" stop-color="#76f5a4" stop-opacity="0"/></linearGradient></defs><rect x="0" y="7" width="800" height="2" rx="1" fill="url(#d)"/><circle cx="400" cy="8" r="5" fill="#ffb347"/></svg>`;
    await fs.writeFile(path.join(source, 'divider.svg'), divider);
    await sharp(Buffer.from(divider)).png().toFile(path.join(output, 'divider.png'));
    console.log('divider.png');
}
