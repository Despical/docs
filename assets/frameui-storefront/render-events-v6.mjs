// Run from the docs root: node assets/frameui-storefront/render-events-v6.mjs
// Static panel for the Hub description that lists the player events, in the style of the v5 panels.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const output = path.join(root, 'public/images/frameui/storefront');
const height = 720;

const events = [
  ['First join', "A player's very first join", 'Worlds'],
  ['Respawn', 'After dying or leaving the End', 'Reason · bed, anchor or world spawn'],
  ['Death', 'Plays over the death screen', 'Cause · killed by player, mob or environment'],
  ['Fall asleep', 'A player lies down in a bed', 'Worlds'],
  ['Wake up', 'A player gets out of bed', 'Slept until morning or left early'],
  ['Level up', 'A new experience level', 'Minimum, maximum and every Nth level'],
  ['Advancement', 'Tasks, goals and challenges', 'Type and advancement IDs'],
  ['Enter vehicle', 'Boats, minecarts and rideable mobs', 'Vehicle type and seat'],
  ['Leave vehicle', 'Getting off any vehicle', 'Vehicle type and seat']
];

const icons = [
  '<path d="M0-13 3.5-4 13-3 6 3.5 8 13 0 8-8 13-6 3.5-13-3-3.5-4Z"/>',
  '<path d="M-10 4A11 11 0 1 1 10 4M10-2V4H4" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M0-13C8-13 12-7 12-1 12 4 9 6 7 7V12H-7V7C-9 6-12 4-12-1-12-7-8-13 0-13ZM-5-2a2.6 2.6 0 1 0 .1 0M5-2a2.6 2.6 0 1 0 .1 0" fill-rule="evenodd"/>',
  '<path d="M-13 8V-9M-13 2H13V8M-13 2V-2H-1C0-6 4-6 5-2H13V2Z" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M-6-10A13 13 0 1 0 10 6 10 10 0 0 1-6-10Z"/>',
  '<path d="M-10 6 0-11 10 6M-5 12H5" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M-9-12H9V-3C9 3 5 6 1 7V10H6V13H-6V10H-1V7C-5 6-9 3-9-3ZM-9-9H-14C-14-3-12 0-9 1M9-9H14C14-3 12 0 9 1" fill="none" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M-13 3H13L9 11H-9ZM-9 3V-7H7L9 3" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
  '<path d="M-13 3H13L9 11H-9ZM6-12V-1M2-5 6-12 10-5" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
];

const xs = [64, 456, 848];
const ys = [208, 364, 520];
const cards = events.map(([title, text, option], index) => {
  const x = xs[index % 3], y = ys[Math.floor(index / 3)];
  return `<g transform="translate(${x} ${y})">
  <rect width="368" height="136" rx="16" fill="#132b3c" fill-opacity=".72" stroke="#789499" stroke-opacity=".28"/>
  <circle cx="42" cy="44" r="24" fill="url(#teal)" stroke="#bc9a5b" stroke-width="1.5"/>
  <g transform="translate(42 44)" fill="#f6dda1" stroke="#f6dda1">${icons[index]}</g>
  <text x="82" y="42" fill="#fff0ce" font-size="22" font-weight="bold">${title}</text>
  <text x="82" y="66" fill="#bad0d8" font-size="14.5">${text}</text>
  <path d="M24 92H344" stroke="#d8b978" stroke-opacity=".25"/>
  <text x="24" y="118" fill="#8fb5b0" font-size="13.5">${option}</text>
</g>`;
}).join('');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="${height}" viewBox="0 0 1280 ${height}">
<defs>
 <linearGradient id="navy" x2="1" y2="1"><stop stop-color="#101e30"/><stop offset=".55" stop-color="#182b42"/><stop offset="1" stop-color="#103e43"/></linearGradient>
 <linearGradient id="teal" x2="1" y2="1"><stop stop-color="#235461"/><stop offset="1" stop-color="#13363f"/></linearGradient>
 <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#93bdcc" stroke-opacity=".055"/></pattern>
</defs>
<g font-family="Verdana,DejaVu Sans,sans-serif">
 <rect width="1280" height="${height}" rx="24" fill="url(#navy)"/>
 <rect width="1280" height="${height}" rx="24" fill="url(#grid)"/>
 <g fill="none" stroke="#83b9b5" opacity=".11"><circle cx="1280" cy="0" r="380"/><circle cx="1280" cy="0" r="310"/><circle cx="0" cy="${height}" r="280"/><circle cx="0" cy="${height}" r="215"/></g>
 <rect x="24" y="24" width="1232" height="${height - 48}" rx="25" fill="#132b3c" fill-opacity=".45" stroke="#789499" stroke-opacity=".2"/>
 <text x="640" y="97" text-anchor="middle" fill="#fff0ce" font-size="41" font-weight="bold">Mark every moment.</text>
 <text x="640" y="140" text-anchor="middle" fill="#bad0d8" font-size="20">Play an effect when something happens to a player, with settings for each event.</text>
 <path d="M80 162H1200" stroke="#d8b978" stroke-opacity=".3"/>
 ${cards}
</g></svg>`;

await fs.mkdir(output, { recursive: true });
await sharp(Buffer.from(svg)).webp({ quality: 90 }).toFile(path.join(output, 'events-v6.webp'));
await fs.writeFile(path.join(root, 'assets/frameui-storefront/events-v6.svg'), svg);
console.log('events-v6.webp written');
