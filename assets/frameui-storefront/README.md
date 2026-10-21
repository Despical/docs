# FrameUI storefront artwork

The current panels use Verdana, navy backgrounds, teal surfaces and thin gold preview contours. The `v6` cover adds the inclusive Minecraft 1.21.11–26.3 badge. Motion, themes and Studio retain their `v5` artwork, and the approved playback diagram retains `playback-v4.webp`. Names are composited into the preview clips, so each badge follows the effect currently playing.

Run from the docs project root:

```sh
FFMPEG_PATH=/path/to/ffmpeg node assets/frameui-storefront/render-v5.mjs
FFMPEG_PATH=/path/to/ffmpeg node assets/frameui-storefront/render-cover-v6.mjs
```

On the author's Windows machine, the script also recognizes the existing `ffmpeg-static` installation. It uses the project's `sharp` dependency for SVG rendering. Intermediate files remain in `.cache/frameui-storefront-v5/`. Only the current artwork sources are retained. `cover-v5.svg` is the input for the `v6` cover; `render-v4.mjs` is retained to regenerate the current `playback-v4.webp` diagram.

Badge dimensions come from the alpha bounds of the actual rendered glyphs, rather than a character-count estimate. Each badge has 16 pixels of horizontal padding on both sides and 10 pixels above and below the text. `v5-badge-metrics.json` records the measured dimensions for every featured label.

The source clips are the complete `public/images/frameui/*.mp4` gallery renders, including the Minecraft preview scene before and after each effect. They are Studio renders, not gameplay recordings. Short effects repeat complete cycles within a six-second slot; longer effects finish before the remaining scene pause. No entrance or exit is removed.

The cover rotates three large designs and nine distinct effects across three smaller slots. The motion panel shows four full transitions. The themes panel rotates three complete designs. The Studio panel animates the preview canvas within the captured interface; the surrounding controls are a still screenshot.

Outputs are animated WebP at 20 fps, quality 90 and infinite loop. Identical frames may be combined by the encoder. `v5-manifest.json` records the featured effects; Aurora and Solar Flare are not featured.

`topic-v6.bbcode` is the matching Hub description. It uses native `[hr]` separators and a single balanced center block around the uncropped live bStats signature. The signature remains hosted by bStats and updates there; it is not a static imitation of usage data.
