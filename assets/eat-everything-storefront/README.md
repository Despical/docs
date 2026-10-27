# Eat Everything storefront artwork

Marketplace artwork for Hub, SpigotMC and BuiltByBit. Panels use Verdana on a warm dark background with orange contours. Outputs are written to `public/images/eat-everything/storefront/` and are served from `https://docs.despical.dev/images/eat-everything/storefront/` once the docs site is deployed.

Run from the docs project root:

```sh
node assets/eat-everything-storefront/render.mjs [panel ...]
node assets/eat-everything-storefront/build-topics.mjs
```

Without panel names every panel is rendered.

| Panel | Source |
| --- | --- |
| `cover` | Drawn in SVG with the project icon |
| `anything`, `config`, `features` | Drawn in SVG |
| `editing`, `info`, `help` | Cropped in-game chat screenshots from `public/images/eat-everything/chat/` |
| `divider` | Section divider for platforms without `[hr]` |

`topic.source.bbcode` is the single description source. `build-topics.mjs` produces:

- `topic-hub.bbcode`: cover, `[hr]` separators, plain commands.
- `topic-spigot.bbcode`: cover, image dividers, `[icode]` for commands.
- `topic-builtbybit.bbcode`: same as Spigot without the cover, which BuiltByBit displays itself.

Commands written between backticks in the source become inline code on the marketplaces.

The chat screenshots are cropped from full-window captures so that only the chat panels remain. Re-crop them if the panel layout in `messages.yml` changes.
