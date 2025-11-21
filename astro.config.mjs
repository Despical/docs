// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://despical.github.io',
    base: '/docs',
	integrations: [
		starlight({
			title: 'Plugin Docs',
			social: [
                { icon: 'github', label: 'GitHub', href: 'https://github.com/Despical' },
                { icon: 'discord', label: 'GitHub', href: 'https://discord.gg/uXVU8jmtpU' }
            ],
            lastUpdated: true,
            editLink: {
                baseUrl: "https://github.com/Despical/docs/edit/main/",
            },
            logo: {
                src: "/src/assets/despical-light.png"
            },
            sidebar: [
                {
                    label: 'Easter Eggs',
                    items: [
                        {
                            label: 'Getting Started',
                            items: [
                                {label: 'Installation', slug: 'easter-eggs/get-started'},
                                {label: 'Creating New Eggs', slug: 'easter-eggs/creating-new-eggs'},
                            ],
                        },
                        {
                            label: 'Database',
                            items: [
                                {label: 'MySQL Configuration', slug: 'easter-eggs/database'}
                            ],
                        },
                        {
                            label: 'Placeholders',
                            items: [
                                {label: 'PlaceholderAPI', slug: 'easter-eggs/placeholders'}
                            ],
                        },
                    ],
                },
            ],
            customCss: [
                "@fontsource/poppins/400.css",
                "@fontsource/jetbrains-mono/400.css",
                "@fontsource/jetbrains-mono/600.css",
                "./src/styles/custom.css",
            ],
            components: {
                SiteTitle: "./src/components/overrides/SiteTitle.astro",
                Footer: "./src/components/overrides/Footer.astro",
                LastUpdated: "./src/components/overrides/LastUpdated.astro",
            }
		}),
	],
});
