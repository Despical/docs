// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from "starlight-sidebar-topics";

const googleAnalyticsId = 'G-SGNN9QLBSE';

// https://astro.build/config
export default defineConfig({
    site: 'https://docs.despical.dev',
    base: '/',
    build: {
        inlineStylesheets: "always",
    },
    integrations: [
        starlight({
            title: 'Plugin Docs',
            social: [
                {icon: 'github', label: 'home:GitHub', href: 'https://github.com/Despical'},
                {icon: "github", label: "command-framework:Github", href: "https://github.com/Despical/CommandFramework",},
                {icon: "seti:java", label: "command-framework:Javadoc", href: "https://despical.github.io/CommandFramework/"},
                {icon: 'discord', label: 'Discord', href: 'https://discord.gg/uXVU8jmtpU'},
                {icon: 'patreon', label: 'Patreon', href: 'https://patreon.com/despical'},
            ],
            lastUpdated: true,
            editLink: {
                baseUrl: "https://github.com/Despical/docs/edit/main/",
            },
            logo: {
                src: "/src/assets/despical-light.png"
            },
            customCss: [
                "@fontsource/poppins/400.css",
                "@fontsource/jetbrains-mono/400.css",
                "@fontsource/jetbrains-mono/600.css",
                "./src/styles/custom.css",
            ],
            components: {
                SiteTitle: "./src/components/overrides/SiteTitle.astro",
                PageFrame: "./src/components/overrides/PageFrame.astro",
                Footer: "./src/components/overrides/Footer.astro",
                LastUpdated: "./src/components/overrides/LastUpdated.astro",
                SocialIcons: "./src/components/overrides/SocialIcons.astro",
                Sidebar: "@astrojs/starlight/components/Sidebar.astro",
            },
            plugins: [
                starlightSidebarTopics([
                    {
                        id: "easter-eggs",
                        label: 'Easter Eggs',
                        link: '/easter-eggs/',
                        icon: 'easter-eggs',
                        items: [
                            {
                                label: 'Easter Eggs',
                                items: [
                                    {
                                        label: 'Getting Started',
                                        items: [
                                            {label: 'Installation', slug: 'easter-eggs/getting-started'},
                                            {label: 'Creating New Eggs', slug: 'easter-eggs/creating-new-eggs'},
                                        ],
                                    },
                                    {
                                        label: 'Configuration Files',
                                        items: [
                                            {label: 'Config Files', slug: 'easter-eggs/configuration'}
                                        ],
                                    },
                                    {
                                        label: 'Commands',
                                        items: [
                                            {
                                                label: 'Commands & Permissions',
                                                slug: 'easter-eggs/commands-and-permissions'
                                            }
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
                                    {
                                        label: 'API',
                                        items: [
                                            {label: 'Developer API', slug: 'easter-eggs/developer-api'}
                                        ],
                                    },
                                    {
                                        label: "Support",
                                        collapsed: true,
                                        items: [
                                            {label: "Discord Server", link: "https://discord.gg/uXVU8jmtpU", attrs: {target: "_blank"}},
                                            {label: "Spigot Discussion", link: "https://www.spigotmc.org/threads/643570/page-100", attrs: {target: "_blank"}},
                                        ]
                                    },
                                    {
                                        label: 'FAQ',
                                        items: [
                                            {label: 'Frequently Asked Questions', slug: 'easter-eggs/faq'}
                                        ],
                                    },
                                ],
                            },
                        ]
                    },
                    {
                        id: "carousel",
                        label: 'Carousel',
                        link: '/carousel/',
                        icon: 'carousel',
                        items: [
                            {
                                label: 'Carousel',
                                items: [
                                    {
                                        label: 'Getting Started',
                                        items: [
                                            {label: 'Installation', slug: 'carousel/getting-started'},
                                            {label: 'Creating Carousels', slug: 'carousel/creating-carousels'},
                                        ],
                                    },
                                    {
                                        label: 'Configuration Files',
                                        items: [
                                            {label: 'Config Files', slug: 'carousel/configuration'}
                                        ],
                                    },
                                    {
                                        label: 'Movement Mechanics',
                                        items: [
                                            {label: 'Carousel Behavior', slug: 'carousel/carousel-behavior'}
                                        ],
                                    },
                                    {
                                        label: 'Commands',
                                        items: [
                                            {
                                                label: 'Commands & Permissions',
                                                slug: 'carousel/commands-and-permissions'
                                            }
                                        ],
                                    },
                                    {
                                        label: 'API',
                                        items: [
                                            {label: 'Developer API', slug: 'carousel/developer-api'}
                                        ],
                                    },
                                    {
                                        label: "Support",
                                        collapsed: true,
                                        items: [
                                            {label: "Discord Server", link: "https://discord.gg/uXVU8jmtpU", attrs: {target: "_blank"}},
                                            {label: "Spigot Discussion", link: "https://www.spigotmc.org/threads/644299/page-100", attrs: {target: "_blank"}},
                                        ]
                                    },
                                    {
                                        label: 'FAQ',
                                        items: [
                                            {label: 'Frequently Asked Questions', slug: 'carousel/faq'}
                                        ],
                                    },
                                ],
                            },
                        ]
                    },
                    {
                        label: "Command Framework",
                        link: '/command-framework/',
                        icon: 'command-framework',
                        items: [
                            {
                                label: 'Command Framework',
                                items: [
                                    {
                                        label: "Getting Started",
                                        items: [
                                            {label: "Overview", slug: 'command-framework/getting-started'},
                                            {label: "Command Basics", slug: 'command-framework/command-basics'},
                                        ]
                                    },
                                    {
                                        label: "Core Features",
                                        items: [
                                            {label: "Command Arguments", slug: 'command-framework/command-arguments'},
                                            {label: "Custom Parameters", slug: 'command-framework/custom-parameters'},
                                            {label: "Command Cooldowns", slug: 'command-framework/command-cooldowns'},
                                        ]
                                    },
                                    {
                                        label: "Examples",
                                        items: [
                                            {label: "Command Examples", slug: "command-framework/examples"},
                                        ]
                                    },
                                    {
                                        label: "Support",
                                        collapsed: true,
                                        items: [
                                            {label: "Issue Tracker", link: "https://github.com/Despical/CommandFramework/issues/new/choose", attrs: {target: "_blank"}},
                                            {label: "Spigot Discussion", link: "https://spigotmc.org/threads/494383/page-100", attrs: {target: "_blank"}},
                                        ]
                                    },
                                    {
                                        label: "Documents",
                                        items: [
                                            {label: "Javadocs", link: "https://despical.github.io/CommandFramework/", attrs: {target: "_blank"}},
                                        ]
                                    },
                                    {
                                        label: "FAQ",
                                        items: [
                                            {label: "Relocate the Framework", slug: "command-framework/relocate-the-framework"},
                                            {label: "Register Commands inside a Package", slug: "command-framework/register-commands-in-a-package"},
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ])
            ],
            head: [
                {
                    tag: 'script',
                    attrs: {
                        src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
                    },
                },
                {
                    tag: 'script',
                    content: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
            
                      gtag('config', '${googleAnalyticsId}');
                      `,
                },
            ],
        }),
    ],
});
