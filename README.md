<p align="center">
  <img src="public/favicon.svg" width="96" height="96" alt="Despical Docs icon">
</p>

<h1 align="center">Despical Docs</h1>

<p align="center">Setup guides, configuration and API references for Despical's Minecraft plugins and developer tools.</p>

<p align="center">
  <a href="https://github.com/Despical/docs/actions/workflows/deploy.yml"><img src="https://github.com/Despical/docs/actions/workflows/deploy.yml/badge.svg" alt="Deployment"></a>
  <img src="https://img.shields.io/badge/Astro-5-bc52ee?logo=astro&amp;logoColor=white" alt="Astro 5">
  <img src="https://img.shields.io/badge/Starlight-0.36-75e8dc" alt="Starlight 0.36">
  <img src="https://img.shields.io/badge/Node.js-22-5fa04e?logo=nodedotjs&amp;logoColor=white" alt="Node.js 22">
  <a href="https://discord.gg/uXVU8jmtpU"><img src="https://img.shields.io/discord/1291011225467224148.svg?color=5865f2&amp;label=Discord&amp;logo=discord&amp;logoColor=white" alt="Discord"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue" alt="MIT license"></a>
</p>

<p align="center">
  <a href="https://docs.despical.dev/">Read the Docs</a> ·
  <a href="https://javadoc.despical.dev/">Javadocs</a> ·
  <a href="https://hub.despical.dev/">Plugin Hub</a> ·
  <a href="https://discord.gg/uXVU8jmtpU">Discord</a>
</p>

---

This repository contains the documentation for Despical's plugins and related projects. Changes pushed to `main` are automatically built and published to [docs.despical.dev](https://docs.despical.dev/).

## Getting started

Install [Node.js 22](https://nodejs.org/) and [pnpm 10](https://pnpm.io/installation), then run:

```sh
git clone https://github.com/Despical/docs.git
cd docs
pnpm install
pnpm run dev
```

Open [localhost:4321](http://localhost:4321) in your browser. Documentation pages live in [`src/content/docs/`](src/content/docs/).

## Building

Create a production build:

```sh
pnpm run build
```

The generated site is saved to `dist/`. To preview it locally:

```sh
pnpm run preview
```

## Contributing

Found a missing step or outdated example? [Open an issue](https://github.com/Despical/docs/issues/new) or submit a [pull request](https://github.com/Despical/docs/pulls) with your improvements.

## License

Licensed under the [MIT License](LICENSE). See the license file for required notices and attributions.
