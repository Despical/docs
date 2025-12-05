# Despical Docs
[![Discord](https://img.shields.io/discord/1291011225467224148.svg?color=7289DA&label=discord)](https://discord.gg/YOUR_SERVER)
![Deploy](https://github.com/despical/docs/actions/workflows/deploy.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

This repository contains all the documentation for Despical's plugins and related projects.  
Content in this repo is automatically published to **https://docs.despical.dev/**.

## Getting Started
Setting up the project for local development.

### Prerequisites

- [node 22](https://nodejs.org)
- [pnpm](https://pnpm.io/installation)

## Local Development

```bash
# 1. Clone the repository
git clone https://github.com/despical/docs.git && cd docs

# 2. Install dependencies
pnpm install

# 3. Start development server
pnpm run dev
```

The server will run on http://localhost:4321

## Building
This command creates a production-ready build. The generated files can be deployed to any static content hosting provider.

```bash
pnpm run build
```

## Contributing
Contributions are welcome!

If you'd like to improve the documentation, fix issues or help expand the content, feel free to [open an issue](https://github.com/Despical/docs/issues/new)
or submit a [pull request](https://github.com/Despical/docs/pulls).

## License
This code is under the [MIT License](https://opensource.org/license/mit).

See the [LICENSE](../LICENSE) file for required notices and attributions.
