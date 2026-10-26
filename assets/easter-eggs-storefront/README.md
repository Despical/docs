# Easter Eggs storefront artwork

Marketplace artwork for Hub, SpigotMC and BuiltByBit. Panels use Verdana on a night-violet background with gold contours and the four season colors. Outputs are written to `public/images/easter-eggs/storefront/` and are served from `https://docs.despical.dev/images/easter-eggs/storefront/` once the docs site is deployed.

Run from the docs project root:

```sh
FFMPEG_PATH=/path/to/ffmpeg node assets/easter-eggs-storefront/render.mjs [panel ...]
node assets/easter-eggs-storefront/build-topics.mjs
```

Without panel names every panel is rendered. Intermediate clips are cached in `.cache/easter-eggs-storefront/`.

| Panel | Type | Source |
| --- | --- | --- |
| `cover`, `seasons`, `styles`, `particles` | Animated WebP, 20 fps | Template recordings in `public/images/easter-eggs/videos/` |
| `tour` | Animated WebP, 20 fps | 13.5 seconds of the cinematic recording |
| `hunt-rules`, `hints`, `storage`, `api`, `start` | PNG | Drawn in SVG |
| `rewards`, `menus`, `leaderboards`, `inbox`, `editor` | PNG | Cropped menu screenshots at native pixel size |
| `divider` | PNG | Section divider for platforms without `[hr]` |

`topic.source.bbcode` is the single description source. `build-topics.mjs` produces:

- `topic-hub.bbcode`: cover, `[hr]` separators, plain commands.
- `topic-spigot.bbcode`: cover, image dividers, `[icode]` for commands and placeholders.
- `topic-builtbybit.bbcode`: same as Spigot without the cover, which BuiltByBit displays itself.

Commands written between backticks in the source become inline code on the marketplaces.
