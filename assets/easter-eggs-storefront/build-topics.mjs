// Run from the docs root: node assets/easter-eggs-storefront/build-topics.mjs
// Builds the Hub, Spigot and BuiltByBit descriptions from topic.source.bbcode.
import fs from 'node:fs/promises';
import path from 'node:path';

const dir = path.join(process.cwd(), 'assets/easter-eggs-storefront');
const source = await fs.readFile(path.join(dir, 'topic.source.bbcode'), 'utf8');
const base = 'https://docs.despical.dev/images/easter-eggs/storefront';
const cover = `[center][img]${base}/cover.webp[/img][/center]\n\n`;
const divider = `[center][img]${base}/divider.png[/img][/center]`;

const platforms = {
    // Hub renders [hr] and shows commands as plain text.
    hub: { cover, hr: '[hr][/hr]', code: text => text },
    // Spigot has no [hr]; inline code prevents smiley substitution in commands and placeholders.
    spigot: { cover, hr: divider, code: text => `[icode]${text}[/icode]` },
    // BuiltByBit already shows the resource cover above the description.
    builtbybit: { cover: '', hr: divider, code: text => `[icode]${text}[/icode]` },
};

for (const [name, platform] of Object.entries(platforms)) {
    const text = source
        .replace('{{COVER}}', platform.cover)
        .replaceAll('{{HR}}', platform.hr)
        .replace(/`([^`\n]+)`/g, (_, code) => platform.code(code));
    await fs.writeFile(path.join(dir, `topic-${name}.bbcode`), text);
    console.log(`topic-${name}.bbcode: ${text.length} characters`);
}
