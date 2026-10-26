// Run from the docs root: FFMPEG_PATH=/path/to/ffmpeg node assets/easter-eggs-storefront/render.mjs
// Animated panels use the in-game recordings in public/images/easter-eggs/videos.
// Static panels embed the cropped menu screenshots at their native pixel size.
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import sharp from 'sharp';

const root = process.cwd();
const source = path.join(root, 'assets/easter-eggs-storefront');
const media = path.join(root, 'public/images/easter-eggs');
const output = path.join(media, 'storefront');
const temp = path.join(root, '.cache/easter-eggs-storefront');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';
const fps = 20;
const only = process.argv.slice(2);
const wanted = name => only.length === 0 || only.includes(name);

await fs.mkdir(temp, { recursive: true });
await fs.mkdir(output, { recursive: true });

const C = {
    title: '#fff4e4', gold: '#ffd27a', body: '#d3cde6', muted: '#a79fc4', line: '#e8c27a',
    spring: '#ff8fc8', summer: '#5fd6ff', autumn: '#ffab40', winter: '#7ff0b8', violet: '#c39bff',
};

const defs = `<defs>
 <linearGradient id="night" x2="1" y2="1"><stop stop-color="#181430"/><stop offset=".55" stop-color="#211c3f"/><stop offset="1" stop-color="#14302f"/></linearGradient>
 <linearGradient id="gold" x2="1"><stop stop-color="#c48a3e"/><stop offset=".5" stop-color="#ffe2a0"/><stop offset="1" stop-color="#c79049"/></linearGradient>
 <linearGradient id="surface" x2="1" y2="1"><stop stop-color="#2d2752"/><stop offset="1" stop-color="#1f2a40"/></linearGradient>
 <linearGradient id="code" x2="1" y2="1"><stop stop-color="#141226"/><stop offset="1" stop-color="#191a30"/></linearGradient>
 <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#b9a8ff" stroke-opacity=".05"/></pattern>
 <radialGradient id="hot"><stop stop-color="#ff7a6b" stop-opacity=".55"/><stop offset="1" stop-color="#ff7a6b" stop-opacity=".18"/></radialGradient>
 <radialGradient id="warm"><stop stop-color="#f2b45a" stop-opacity=".2"/><stop offset="1" stop-color="#f2b45a" stop-opacity=".12"/></radialGradient>
 <radialGradient id="cold"><stop stop-color="#5fb3e6" stop-opacity=".12"/><stop offset="1" stop-color="#5fb3e6" stop-opacity=".05"/></radialGradient>
</defs>`;

const esc = s => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const svg = (h, content) => `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${h}" viewBox="0 0 1280 ${h}">${defs}<g font-family="Verdana,DejaVu Sans,sans-serif">${content}</g></svg>`;
const egg = (cx, cy, s, fill, extra = '') => `<path transform="translate(${cx} ${cy}) scale(${s})" d="M0 -26C13 -26 22 -6 22 8C22 21 12 28 0 28C-12 28 -22 21 -22 8C-22 -6 -13 -26 0 -26Z" fill="${fill}" ${extra}/>`;
const background = h => `<rect width="1280" height="${h}" rx="24" fill="url(#night)"/><rect width="1280" height="${h}" rx="24" fill="url(#grid)"/>
 <g opacity=".5">${egg(1205, 70, 1.5, C.spring, 'fill-opacity=".09"')}${egg(1150, 128, .9, C.gold, 'fill-opacity=".08"')}${egg(80, h - 70, 1.3, C.summer, 'fill-opacity=".08"')}${egg(140, h - 30, .8, C.winter, 'fill-opacity=".07"')}</g>`;
const panel = h => `${background(h)}<rect x="24" y="24" width="1232" height="${h - 48}" rx="25" fill="#231d44" fill-opacity=".45" stroke="#a99be0" stroke-opacity=".18"/><path d="M80 162H1200" stroke="${C.line}" stroke-opacity=".3"/>`;
const heading = (title, subtitle) => `<text x="640" y="97" text-anchor="middle" fill="${C.title}" font-size="41" font-weight="bold">${esc(title)}</text><text x="640" y="140" text-anchor="middle" fill="${C.body}" font-size="20">${esc(subtitle)}</text>`;
const footer = (y, text) => `<text x="640" y="${y}" text-anchor="middle" fill="${C.gold}" font-size="17" font-weight="bold" letter-spacing=".5">${esc(text)}</text>`;
const frame = (x, y, w, h) => `<rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="9" fill="#141126" stroke="#d6b06a" stroke-width="2"/><rect x="${x - 2}" y="${y - 2}" width="${w + 4}" height="${h + 4}" fill="#141126"/>`;
const card = (x, y, w, h, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="url(#surface)" stroke="#a99be0" stroke-opacity=".32" ${extra}/>`;
const chip = (x, y, text, color = C.body, w) => {
    const width = w ?? Math.round(text.length * 9.2 + 30);
    return { width, markup: `<rect x="${x}" y="${y}" width="${width}" height="36" rx="18" fill="#1a1631" stroke="${color}" stroke-opacity=".55"/><text x="${x + width / 2}" y="${y + 24}" text-anchor="middle" fill="${color}" font-size="15">${esc(text)}</text>` };
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

async function screenshot(id, scale = 1) {
    const file = path.join(media, 'menus', `${id}.png`);
    const meta = await sharp(file).metadata();
    const png = await sharp(file).resize(Math.round(meta.width * scale), Math.round(meta.height * scale), { kernel: 'nearest' }).png().toBuffer();
    return { w: Math.round(meta.width * scale), h: Math.round(meta.height * scale), href: `data:image/png;base64,${png.toString('base64')}` };
}
async function shotFrame(id, x, y, caption) {
    const s = await screenshot(id);
    return `${frame(x, y, s.w, s.h)}<image x="${x}" y="${y}" width="${s.w}" height="${s.h}" href="${s.href}"/>${caption ? `<text x="${x + s.w / 2}" y="${y + s.h + 40}" text-anchor="middle" fill="${C.body}" font-size="18">${esc(caption)}</text>` : ''}`;
}

async function art(name, h, content) {
    const s = svg(h, content);
    await fs.writeFile(path.join(source, `${name}.svg`), s);
    return sharp(Buffer.from(s));
}
async function still(name, h, content) {
    if (!wanted(name)) return;
    const image = await art(name, h, content);
    const target = path.join(output, `${name}.png`);
    await image.png({ compressionLevel: 9, palette: false }).toFile(target);
    console.log(`${name}.png: ${((await fs.stat(target)).size / 1048576).toFixed(2)} MiB`);
}

function run(args) {
    return new Promise((resolve, reject) => {
        const p = spawn(ffmpeg, ['-y', '-hide_banner', '-loglevel', 'error', '-threads', '4', ...args]);
        let err = '';
        p.stderr.on('data', b => err += b);
        p.on('error', reject);
        p.on('close', c => c === 0 ? resolve() : reject(new Error(err)));
    });
}

const names = {
    'candy': 'CANDY', 'carrot': 'CARROT', 'easter-basket': 'EASTER BASKET', 'ghost': 'GHOST', 'gingerbread': 'GINGERBREAD',
    'gold-coin': 'GOLD COINS', 'golden-egg': 'GOLDEN EGG', 'ornament': 'ORNAMENT', 'painted-egg': 'PAINTED EGG', 'pearl': 'PEARL',
    'present': 'WRAPPED PRESENT', 'pumpkin': 'PUMPKIN', 'seashell': 'SEASHELL', 'skull': 'SKULL', 'snow-globe': 'SNOW GLOBE',
    'snowman': 'SNOWMAN', 'spring-rabbit': 'SPRING RABBIT', 'starfish': 'STARFISH', 'treasure-chest': 'SUNKEN TREASURE',
    'witch-cauldron': 'WITCH CAULDRON',
};

// Badge size follows the measured glyph bounds, so padding is identical for every label.
async function badge(text, size) {
    const target = path.join(temp, `badge-${text.replace(/[^a-z0-9]+/gi, '-').toLowerCase()}-${size}.png`);
    try { await fs.stat(target); return target; } catch { }
    const probe = Buffer.from(`<svg width="1200" height="100" xmlns="http://www.w3.org/2000/svg"><text x="0" y="70" font-family="Verdana,DejaVu Sans,sans-serif" font-size="${size}" font-weight="bold" fill="#ffe8b6">${esc(text)}</text></svg>`);
    const { data, info } = await sharp(probe).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let left = info.width, right = -1, top = info.height, bottom = -1;
    for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
        if (data[(y * info.width + x) * 4 + 3] !== 0) { left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y); }
    }
    const tw = right - left + 1, th = bottom - top + 1, w = tw + 30, h = th + 20;
    const glyphs = await sharp(probe).extract({ left, top, width: tw, height: th }).png().toBuffer();
    const surface = Buffer.from(`<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" rx="7" fill="#1a1631" fill-opacity=".92" stroke="#ecc47e"/></svg>`);
    await sharp(surface).composite([{ input: glyphs, left: 15, top: 10 }]).png().toFile(target);
    return target;
}

// Crops center on the egg, which sits slightly below the frame center in every recording.
const crops = { wide: [1280, 720], close: [960, 540], tight: [720, 405] };
// Templates recorded from a longer camera distance sit lower in the frame.
const centers = { candy: 640, snowman: 640, ornament: 620, gingerbread: 600 };
const cropOf = (kind, id) => {
    const [w, h] = crops[kind];
    const y = Math.max(0, Math.min(1080 - h, (centers[id] ?? 580) - h / 2));
    return [w, h, (1920 - w) / 2, Math.round(y)];
};
async function clip(id, w, h, { crop = 'close', start = 2, seconds = 4, label = names[id], src = `videos/${id}.mp4` } = {}) {
    const key = `v2-${id}-${w}x${h}-${crop}-${start}-${seconds}-${label ?? 'none'}`.replace(/[^a-z0-9.-]+/gi, '_');
    const target = path.join(temp, `${key}.mp4`);
    try { if ((await fs.stat(target)).size > 1000) return target; } catch { }
    const [cw, ch, cx, cy] = id === 'tour' ? [1280, 720, 320, 210] : cropOf(crop, id);
    const args = ['-ss', String(start), '-t', String(seconds), '-i', path.join(media, src)];
    let filter = `[0:v]crop=${cw}:${ch}:${cx}:${cy},fps=${fps},scale=${w}:${h}:flags=lanczos,setpts=PTS-STARTPTS[v]`;
    if (label) {
        args.push('-i', await badge(label, w < 400 ? 15 : w < 600 ? 18 : 21));
        filter += `;[v][1:v]overlay=12:12[out]`;
    } else filter += ';[v]null[out]';
    await run([...args, '-filter_complex', filter, '-map', '[out]', '-an', '-c:v', 'libx264', '-crf', '14', '-preset', 'fast', '-pix_fmt', 'yuv444p', target]);
    return target;
}
async function playlist(name, ids, w, h, options) {
    const files = [];
    for (const id of ids) files.push(await clip(id, w, h, options));
    const list = path.join(temp, `${name}.txt`);
    await fs.writeFile(list, files.map(p => `file '${p.replaceAll('\\', '/')}'`).join('\n'));
    const target = path.join(temp, `${name}.mp4`);
    await run(['-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', target]);
    return target;
}
async function animated(name, h, content, inputs, positions, seconds) {
    if (!wanted(name)) return;
    await (await art(name, h, content)).png().toFile(path.join(temp, `${name}-base.png`));
    const args = ['-loop', '1', '-framerate', String(fps), '-i', path.join(temp, `${name}-base.png`)];
    for (const input of await Promise.all(inputs.map(f => f()))) args.push('-i', input);
    const chain = positions.map(([x, y], i) => `[${i === 0 ? '0:v' : `s${i}`}][${i + 1}:v]overlay=${x}:${y}${i === positions.length - 1 ? '' : `[s${i + 1}]`}`).join(';');
    const target = path.join(output, `${name}.webp`);
    await run([...args, '-filter_complex', `${chain},format=bgra`, '-t', String(seconds), '-an', '-c:v', 'libwebp_anim', '-quality', '82', '-compression_level', '5', '-loop', '0', target]);
    console.log(`${name}.webp: ${((await fs.stat(target)).size / 1048576).toFixed(2)} MiB`);
}

// 1. Cover
const features = [
    ['6 ready-made hunts', 'Every season, plus your own.'],
    ['20 animated eggs', 'Placed heads or floating displays.'],
    ['20 particle effects', 'Layered, editable, budgeted.'],
    ['Rewards that stay fair', 'Milestones, pools and rankings.'],
];
await animated('cover', 1020, `${background(1020)}
 <text x="64" y="124" font-size="80" font-weight="bold" fill="${C.title}">EASTER <tspan fill="${C.gold}">EGGS</tspan></text>
 <text x="66" y="173" font-size="27" fill="${C.body}">Seasonal treasure hunts for your world.</text>
 <rect x="938" y="78" width="278" height="44" rx="22" fill="#1a1631" stroke="${C.gold}" stroke-opacity=".7"/>
 <text x="1077" y="107" text-anchor="middle" fill="${C.gold}" font-size="17" font-weight="bold">Minecraft 1.21.11 – 26.3</text>
 <path d="M64 207H1216" stroke="url(#gold)" stroke-opacity=".55"/>
 ${frame(64, 246, 736, 414)}
 <rect x="830" y="241" width="386" height="424" rx="14" fill="url(#surface)" stroke="#a99be0" stroke-opacity=".45"/>
 ${features.map(([t, s], i) => `${egg(857, 284 + i * 92 - 2, .3, [C.spring, C.summer, C.autumn, C.winter][i])}<text x="876" y="${292 + i * 92}" fill="${C.title}" font-size="23" font-weight="bold">${esc(t)}</text><text x="854" y="${325 + i * 92}" fill="${C.body}" font-size="18">${esc(s)}</text>`).join('')}
 <text x="64" y="713" fill="${C.gold}" font-size="22" font-weight="bold">Hide them anywhere. Every one is worth finding.</text>
 ${[64, 456, 848].map(x => frame(x, 750, 368, 207)).join('')}
 <text x="640" y="995" text-anchor="middle" fill="${C.muted}" font-size="17">Timed challenges • Ordered trails • Leaderboards • PlaceholderAPI • SQLite or MySQL</text>`,
    [() => playlist('cover-main', ['golden-egg', 'ghost', 'snow-globe'], 736, 414, { crop: 'wide' }),
    () => playlist('cover-a', ['pearl', 'starfish', 'gold-coin'], 368, 207),
    () => playlist('cover-b', ['pumpkin', 'skull', 'witch-cauldron'], 368, 207),
    () => playlist('cover-c', ['ornament', 'spring-rabbit', 'present'], 368, 207)],
    [[64, 246], [64, 750], [456, 750], [848, 750]], 12);

// 2. Seasons
const seasons = [
    ['SPRING', 'Easter hunt', C.spring, 'easter-basket', 'Painted Egg · Golden Egg · Rabbit · Carrot · Basket'],
    ['SUMMER', 'Scuba hunt', C.summer, 'treasure-chest', 'Treasure · Pearl · Seashell · Gold Coins · Starfish'],
    ['AUTUMN', 'Halloween hunt', C.autumn, 'candy', 'Pumpkin · Candy · Ghost · Skull · Cauldron'],
    ['WINTER', 'Christmas hunt', C.winter, 'snowman', 'Present · Snow Globe · Snowman · Gingerbread · Ornament'],
];
const seasonSlots = [[64, 202], [664, 202], [64, 610], [664, 610]];
await animated('seasons', 1080, `${panel(1080)}${heading('Four seasons. Twenty collectibles.', 'Five bundled eggs for every season, each with its own particle effect.')}
 ${seasonSlots.map(([x, y], i) => {
     const [season, hunt, color, , list] = seasons[i];
     return `${frame(x, y, 552, 311)}<text x="${x}" y="${y + 346}" fill="${color}" font-size="19" font-weight="bold" letter-spacing="1">${season} <tspan fill="${C.body}" font-weight="normal" letter-spacing="0">· ${hunt}</tspan></text><text x="${x}" y="${y + 373}" fill="${C.muted}" font-size="15">${esc(list)}</text>`;
 }).join('')}
 ${footer(1040, 'GLOBAL AND ENCHANTED HUNTS INCLUDED  •  CREATE AS MANY AS YOU LIKE')}`,
    seasons.map(s => () => clip(s[3], 552, 311, { seconds: 6 })), seasonSlots, 6);

// 3. In-game tour
await animated('tour', 940, `${panel(940)}${heading('Follow the trail.', 'Recorded in Minecraft: the bundled templates with their default effects.')}${frame(80, 196, 1120, 630)}${footer(890, 'RECORDED IN-GAME  •  PAPER SERVER  •  BUNDLED SETTINGS')}`,
    [() => clip('tour', 1120, 630, { crop: 'wide', src: 'videos/easter-eggs-cinematic.mp4', start: 40.2, seconds: 13.5, label: null })], [[80, 196]], 13.5);

// 4. Rendering styles
await animated('styles', 760, `${panel(760)}${heading('Placed heads or floating displays.', 'Choose per template. Switching later keeps every egg and its history.')}
 ${frame(64, 210, 552, 311)}${frame(664, 210, 552, 311)}
 <text x="340" y="567" text-anchor="middle" fill="${C.title}" font-size="20" font-weight="bold">Placed head</text><text x="340" y="597" text-anchor="middle" fill="${C.body}" font-size="17">A real skull block that sits in the world.</text>
 <text x="940" y="567" text-anchor="middle" fill="${C.title}" font-size="20" font-weight="bold">Floating display</text><text x="940" y="597" text-anchor="middle" fill="${C.body}" font-size="17">Tune its scale, spin, bob and height.</text>
 ${footer(690, 'PROTECTED FROM BREAKING, EXPLOSIONS, PISTONS AND LIQUIDS')}`,
    [() => clip('pumpkin', 552, 311, { seconds: 6, label: 'PLACED HEAD' }), () => clip('gold-coin', 552, 311, { seconds: 6, label: 'FLOATING DISPLAY' })],
    [[64, 210], [664, 210]], 6);

// 5. Particles
const presets = [['candy', 'WITCH SPIRAL'], ['seashell', 'TIDAL WAVE'], ['pumpkin', 'SPECTRAL ORBIT'], ['present', 'SNOW FLURRY'], ['spring-rabbit', 'BUNNY HEARTS'], ['carrot', 'GOLDEN HALO']];
const presetSlots = [[64, 200], [464, 200], [864, 200], [64, 440], [464, 440], [864, 440]];
await animated('particles', 760, `${panel(760)}${heading('Twenty layered particle effects.', 'Rings, spirals, orbits, hearts, stars and waves. Every color and speed is yours.')}
 ${presetSlots.map(([x, y]) => frame(x, y, 352, 198)).join('')}
 <text x="640" y="684" text-anchor="middle" fill="${C.body}" font-size="17">Separate effects for hidden, found and locked eggs, plus a burst when you collect one.</text>
 ${footer(718, 'PREVIEW ANY EFFECT WITH /eggs admin preview')}`,
    presets.map(([id, label]) => () => clip(id, 352, 198, { crop: 'tight', seconds: 6, label })), presetSlots, 6);

// 6. Hunt rules
const rules = [
    ['Free exploration', C.winter, ['Find eggs in any order.', 'Progress saves as you go.']],
    ['Ordered trail', C.gold, ['Each egg unlocks the next.', 'Clues follow the trail.']],
    ['Timed challenge', C.spring, ['Start, race the clock, retry.', 'Personal and server records.']],
    ['Shared race', C.summer, ['First finder claims each egg.', 'Every egg is fair game again', 'when a new period starts.']],
    ['Scheduled seasons', C.autumn, ['Opens and closes on its own.', 'Top ranks are rewarded', 'when the season ends.']],
    ['Repeat periods', C.violet, ['Once, daily, weekly or', 'after a cooldown. Rewards', 'renew only with a period.']],
];
await still('hunt-rules', 780, `${panel(780)}${heading('Every hunt plays by its own rules.', 'Mix and match per hunt. Progress, rewards and rankings stay separate.')}
 ${rules.map(([title, color, lines], i) => {
     const x = 64 + (i % 3) * 396, y = 200 + Math.floor(i / 3) * 236;
     return `${card(x, y, 360, 212)}${egg(x + 44, y + 52, .62, color)}<text x="${x + 80}" y="${y + 60}" fill="${C.title}" font-size="22" font-weight="bold">${esc(title)}</text>${lines.map((l, j) => `<text x="${x + 28}" y="${y + 118 + j * 30}" fill="${C.body}" font-size="18">${esc(l)}</text>`).join('')}`;
 }).join('')}
 ${footer(728, 'ENTRY RULES:  PERMISSIONS  •  COMPLETED HUNTS  •  PLACEHOLDERAPI VALUES')}`);

// 7. Hints
const bands = [['You feel very warm...', '#F5A97F'], ['You feel warm...', '#D5B877'], ['You feel a little chilly...', '#91D7E3']];
await still('hints', 780, `${panel(780)}${heading('Warmer… warmer… found it.', 'Written clues and hot-and-cold feedback. No arrows, no distances.')}
 <circle cx="330" cy="455" r="245" fill="url(#cold)" stroke="#5fb3e6" stroke-opacity=".45" stroke-dasharray="6 8"/>
 <circle cx="330" cy="455" r="150" fill="url(#warm)" stroke="#f2b45a" stroke-opacity=".55" stroke-dasharray="6 8"/>
 <circle cx="330" cy="455" r="68" fill="url(#hot)" stroke="#ff7a6b" stroke-opacity=".7"/>
 ${egg(330, 452, 1.15, C.gold)}<path d="M316 440q14-8 28 0" stroke="#fff4e4" stroke-opacity=".6" stroke-width="3" fill="none"/>
 <text x="330" y="370" text-anchor="middle" fill="#ff9d90" font-size="16" font-weight="bold">HOT</text>
 <text x="330" y="292" text-anchor="middle" fill="#f2c27a" font-size="16" font-weight="bold">WARM</text>
 <text x="330" y="236" text-anchor="middle" fill="#8ccbf0" font-size="16" font-weight="bold">COLD</text>
 ${bands.map(([t, c], i) => `${card(640, 214 + i * 92, 576, 72)}<text x="672" y="${259 + i * 92}" fill="${c}" font-size="22">${esc(t)}</text>`).join('')}
 ${card(640, 500, 576, 160)}<text x="672" y="546" fill="#7FFFE1" font-size="21" font-weight="bold">Your Clue</text>
 <text x="672" y="588" fill="${C.body}" font-size="19">Something golden catches the spring sunshine.</text>
 <text x="672" y="628" fill="${C.muted}" font-size="16">Each egg can carry its own clue.</text>
 ${footer(730, 'CLUE COOLDOWNS  •  PER-PLAYER SETTINGS  •  OPTIONAL PROGRESS BAR')}`);

// 8. Rewards
const triggers = ['Every egg', 'First find', 'Egg count', 'Progress %', 'Every X eggs', 'Full template set', 'Completion', 'First finishers', 'Personal best', 'Server record', 'Season rank'];
const actions = ['Items', 'XP', 'Money (Vault)', 'Console commands', 'Player commands', 'Messages', 'Broadcasts', 'Titles', 'Action bar', 'Sounds', 'Particles', 'Fireworks'];
await still('rewards', 960, `${panel(960)}${heading('Rewards that are fair by design.', 'Each reward is claimed once per period, through restarts, relogs and retries.')}
 ${await shotFrame('rewards-easter', 64, 214)}
 ${card(624, 209, 592, 352)}<text x="652" y="252" fill="${C.gold}" font-size="18" font-weight="bold" letter-spacing="1">11 TRIGGERS</text>
 ${triggers.map((t, i) => chip(652 + (i % 2) * 274, 274 + Math.floor(i / 2) * 46, t, C.title, 262).markup).join('')}
 <text x="64" y="616" fill="${C.gold}" font-size="18" font-weight="bold" letter-spacing="1">12 ACTIONS, COMBINED FREELY</text>
 ${chipRow(634, actions, C.body)}
 ${[['Weighted pools', 'One surprise per reward,', 'with chances you set.'], ['Item inbox', 'Full inventory? Items wait', 'safely until collected.'], ['Crash-safe delivery', 'Interrupted rewards are held', 'for review, never doubled.']].map(([t, a, b], i) => {
     const x = 64 + i * 396;
     return `${card(x, 754, 360, 150)}<text x="${x + 26}" y="${791}" fill="${C.title}" font-size="20" font-weight="bold">${t}</text><text x="${x + 26}" y="826" fill="${C.body}" font-size="17">${a}</text><text x="${x + 26}" y="854" fill="${C.body}" font-size="17">${b}</text>`;
 }).join('')}`);

// 9-12. Menu pairs
const pair = async (name, title, subtitle, a, b, foot) => still(name, 700, `${panel(700)}${heading(title, subtitle)}
 ${await shotFrame(a[0], 100, 206, a[1])}${await shotFrame(b[0], 660, 206, b[1])}${footer(656, foot)}`);
await pair('menus', 'Menus your players understand.', 'Every hunt, its progress and its collection, one click away. Fully editable in menus.yml.',
    ['hunts', 'Browse every hunt'], ['collection-view', 'Track found and hidden eggs'], 'TYPE /eggs  •  NO LOCATIONS SPOILED');
await pair('leaderboards', 'Rankings worth chasing.', 'Server total, per hunt, current period and fastest finish. Also in PlaceholderAPI.',
    ['leaderboard', 'Choose a ranking'], ['board-results', 'See who leads'], '%eastereggs_leaderboard:global:1:name%');
await pair('inbox', 'Nothing gets lost.', 'Overflow items wait in a personal inbox. Players pick their own effects and sounds.',
    ['pending', 'Reward inbox with expiry reminders'], ['preferences', 'Personal preferences'], 'PARTICLES  •  SOUNDS  •  NEARBY HINTS  •  PROGRESS BAR');
await pair('editor', 'Build hunts without touching a file.', 'Place, move, copy, order and clue eggs, then switch rules on from the editor.',
    ['admin-hunt', 'Hunt dashboard'], ['admin-rules', 'Rules at a click'], 'EVERY ACTION HAS ITS OWN PERMISSION  •  COMMANDS FOR EVERYTHING');

// 13. Storage and migration
const steps = ['Old folder', 'Backup', 'Import', 'Report'];
const stepText = ['Rename the old plugin', 'Copied before reading', 'Eggs and progress', 'Imported, skipped, why'];
await still('storage', 760, `${panel(760)}${heading('Built to keep your data safe.', 'SQLite out of the box, MySQL when you need it, and a guided upgrade path.')}
 ${card(64, 206, 360, 200)}<text x="92" y="252" fill="${C.title}" font-size="24" font-weight="bold">SQLite</text><text x="92" y="292" fill="${C.body}" font-size="17">Zero setup. One file,</text><text x="92" y="320" fill="${C.body}" font-size="17">write-ahead logging.</text><text x="92" y="372" fill="${C.winter}" font-size="15" font-weight="bold">DEFAULT</text>
 ${card(64, 430, 360, 200)}<text x="92" y="476" fill="${C.title}" font-size="24" font-weight="bold">MySQL</text><text x="92" y="516" fill="${C.body}" font-size="17">Your own database server,</text><text x="92" y="544" fill="${C.body}" font-size="17">verified TLS supported.</text><text x="92" y="596" fill="${C.summer}" font-size="15" font-weight="bold">BUILT IN, NO EXTRA PLUGIN</text>
 ${card(456, 206, 760, 424)}<text x="488" y="252" fill="${C.gold}" font-size="18" font-weight="bold" letter-spacing="1">UPGRADING FROM AN OLDER VERSION</text>
 ${steps.map((s, i) => {
     const x = 488 + i * 180;
     return `<rect x="${x}" y="286" width="150" height="150" rx="12" fill="#1a1631" stroke="${C.gold}" stroke-opacity=".5"/><text x="${x + 75}" y="340" text-anchor="middle" fill="${C.gold}" font-size="30" font-weight="bold">${i + 1}</text><text x="${x + 75}" y="378" text-anchor="middle" fill="${C.title}" font-size="18" font-weight="bold">${s}</text>${i < 3 ? `<path d="M${x + 154} 361h20m-6 -6l6 6l-6 6" stroke="${C.gold}" stroke-width="2" fill="none"/>` : ''}<text x="${x + 75}" y="466" text-anchor="middle" fill="${C.body}" font-size="13">${stepText[i]}</text>`;
 }).join('')}
 <text x="488" y="532" fill="${C.body}" font-size="17">Old egg types, locations and player discoveries are imported.</text>
 <text x="488" y="562" fill="${C.body}" font-size="17">History never pays rewards twice. The original stays untouched.</text>
 <text x="488" y="602" fill="${C.muted}" font-size="15">One console command. Clear instructions if something is wrong.</text>
 ${footer(700, 'VALIDATED RELOADS  •  CRASH-SAFE CLAIMS  •  NOTHING OVERWRITTEN')}`);

// 14. Developer API
const kw = '#c39bff', ty = '#7fd6ff', st = '#ffd27a', cm = '#7d7a99', tx = '#e6e1f5';
const code = [
    [[kw, '@EventHandler'], [tx, '(ignoreCancelled = '], [kw, 'true'], [tx, ')']],
    [[kw, 'public void '], [tx, 'onCollect('], [ty, 'EggCollectEvent '], [tx, 'event) {']],
    [[tx, '    '], [kw, 'if '], [tx, '(event.egg().hunt().equals('], [st, '"easter"'], [tx, ')']],
    [[tx, '        && !event.getPlayer().hasPermission('], [st, '"vip"'], [tx, ')) {']],
    [[tx, '        event.setCancelled('], [kw, 'true'], [tx, ');']],
    [[tx, '    }']],
    [[tx, '}']],
    [[tx, '']],
    [[cm, '// Non-blocking queries, immutable snapshots']],
    [[tx, 'api.leaderboard('], [st, '"enchanted"'], [tx, ', '], [kw, 'null'], [tx, ', '], [kw, 'true'], [tx, ', 3)']],
    [[tx, '    .thenAccept(top -> ...);']],
];
const eventGroups = [['EGG', ['Collect', 'Collected', 'Place', 'Placed', 'Remove', 'Removed']], ['HUNT', ['Start', 'ProgressChanged', 'Completed', 'Failed', 'Ended', 'Record', 'Availability']], ['REWARD', ['Deliver', 'Delivered']]];
await still('api', 780, `${panel(780)}${heading('A developer API that stays out of the way.', 'A Bukkit service, immutable records, non-blocking queries and 15 events.')}
 <rect x="64" y="206" width="700" height="440" rx="14" fill="url(#code)" stroke="#a99be0" stroke-opacity=".32"/>
 <circle cx="94" cy="234" r="6" fill="#ff7a6b"/><circle cx="116" cy="234" r="6" fill="#f2b45a"/><circle cx="138" cy="234" r="6" fill="#7ff0b8"/>
 <g font-family="Consolas,'Courier New',monospace" font-size="18">${code.map((line, i) => `<text x="92" y="${290 + i * 32}" xml:space="preserve">${line.map(([c, t]) => `<tspan fill="${c}">${esc(t)}</tspan>`).join('')}</text>`).join('')}</g>
 ${card(796, 206, 420, 440)}
 ${eventGroups.map(([group, events], gi) => {
     const y0 = [246, 384, 560][gi];
     return `<text x="824" y="${y0}" fill="${C.gold}" font-size="16" font-weight="bold" letter-spacing="1">${group} EVENTS</text>${chipRow(y0 + 14, events, C.title, 824, 1196, 8)}`;
 }).join('')}
 ${footer(712, 'CANCELLABLE PRE-EVENTS  •  COMMITTED POST-EVENTS  •  FULL JAVADOC')}`);

// 15. Quick start
const start = [['Drop in the JAR', 'Paper 1.21.11+', 'and Java 25.'], ['Open /eggs admin', 'Pick a hunt and', 'a template.'], ['Place your eggs', 'Like any block. The', 'editor does the rest.'], ['Let them hunt', 'Players use /eggs to', 'track every reward.']];
await still('start', 560, `${panel(560)}${heading('Up and running in minutes.', 'Bundled hunts, eggs, effects and rewards are ready on first start.')}
 ${start.map(([t, a, b], i) => {
     const x = 64 + i * 293;
     return `${card(x, 206, 270, 228)}<circle cx="${x + 46}" cy="${256}" r="24" fill="#1a1631" stroke="${C.gold}"/><text x="${x + 46}" y="265" text-anchor="middle" fill="${C.gold}" font-size="22" font-weight="bold">${i + 1}</text><text x="${x + 26}" y="330" fill="${C.title}" font-size="21" font-weight="bold">${t}</text><text x="${x + 26}" y="372" fill="${C.body}" font-size="17">${a}</text><text x="${x + 26}" y="400" fill="${C.body}" font-size="17">${b}</text>`;
 }).join('')}
 ${footer(500, 'FULL DOCUMENTATION AT DOCS.DESPICAL.DEV/EASTER-EGGS')}`);

// Section divider for marketplaces without [hr] support.
if (wanted('divider')) {
    const divider = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="16" viewBox="0 0 800 16"><defs><linearGradient id="d"><stop stop-color="#ffd27a" stop-opacity="0"/><stop offset=".15" stop-color="#ffd27a" stop-opacity=".75"/><stop offset=".85" stop-color="#ff8fc8" stop-opacity=".75"/><stop offset="1" stop-color="#ff8fc8" stop-opacity="0"/></linearGradient></defs><rect x="0" y="7" width="800" height="2" rx="1" fill="url(#d)"/><g transform="translate(400 8)"><path d="M0 -7C4 -7 6.5 -2 6.5 2C6.5 5.5 3.5 7.5 0 7.5C-3.5 7.5 -6.5 5.5 -6.5 2C-6.5 -2 -4 -7 0 -7Z" fill="#ffd27a"/></g></svg>`;
    await fs.writeFile(path.join(source, 'divider.svg'), divider);
    await sharp(Buffer.from(divider)).png().toFile(path.join(output, 'divider.png'));
    console.log('divider.png');
}
