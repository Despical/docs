// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightSidebarTopics from "starlight-sidebar-topics";
import starlightImageZoom from 'starlight-image-zoom'

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
                {
                    icon: "github",
                    label: "command-framework:Github",
                    href: "https://github.com/Despical/CommandFramework",
                },
                {
                    icon: "seti:java",
                    label: "command-framework:Javadoc",
                    href: "https://despical.github.io/CommandFramework/"
                },
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
                starlightImageZoom(),
                starlightSidebarTopics([
                    {
                        label: "Easter Eggs",
                        link: "/easter-eggs/",
                        icon: "easter-eggs",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/easter-eggs/getting-started",
                                    },
                                    {
                                        label: "Creating New Eggs",
                                        link: "/easter-eggs/creating-new-eggs",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Admin Commands",
                                        link: "/easter-eggs/commands/admin"
                                    }
                                ],
                            },
                            {
                                label: "Configuration",
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/easter-eggs/configuration/config"
                                    },
                                    {
                                        label: "mysql.yml",
                                        link: "/easter-eggs/configuration/mysql"
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/easter-eggs/configuration/messages"
                                    },
                                    {
                                        label: "Other Files",
                                        link: "/easter-eggs/configuration/other-files"
                                    },
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {
                                        label: "General Placeholders",
                                        link: "/easter-eggs/placeholders/general"
                                    },
                                    {
                                        label: "Leaderboard Placeholders",
                                        link: "/easter-eggs/placeholders/leaderboard"
                                    },
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {
                                        label: "Easter Eggs API",
                                        link: "/easter-eggs/api/easter-eggs-api",
                                    },
                                    {
                                        label: "Player Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "FoundNewEggEvent",
                                                link: "/easter-eggs/api/player-events/found-new-egg-event"
                                            },
                                        ],
                                    },
                                    {
                                        label: "Easter Egg Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "EasterEggPlaceEvent",
                                                link: "/easter-eggs/api/easter-egg-events/easter-egg-place-event"
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {
                                        label: "FAQ",
                                        link: "/easter-eggs/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "/easter-eggs/misc/source-code",
                                    },
                                ],
                            },
                        ]
                    },
                    {
                        label: "Carousel",
                        link: "/carousel/",
                        icon: "carousel",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/carousel/getting-started",
                                    },
                                    {
                                        label: "Creating Carousels",
                                        link: "/carousel/creating-carousels",
                                    },
                                ],
                            },
                            {
                                label: "Mechanics",
                                items: [
                                    {
                                        label: "Carousel Behavior",
                                        link: "/carousel/mechanics/carousel-behavior",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Admin Commands",
                                        link: "/carousel/commands/admin"
                                    }
                                ],
                            },
                            {
                                label: "Configuration",
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/carousel/configuration/config"
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/carousel/configuration/messages"
                                    },
                                    {
                                        label: "Other Files",
                                        link: "/carousel/configuration/other-files"
                                    },
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {
                                        label: "Carousel API",
                                        link: "/carousel/api/carousel-api",
                                    },
                                    {
                                        label: "Carousel Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "CarouselMountEvent",
                                                link: "/carousel/api/carousel-events/carousel-mount-event"
                                            },
                                            {
                                                label: "CarouselDismountEvent",
                                                link: "/carousel/api/carousel-events/carousel-dismount-event"
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {
                                        label: "FAQ",
                                        link: "/carousel/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "/carousel/misc/source-code",
                                    },
                                ],
                            },
                        ]
                    },
                    {
                        label: "Santa Says",
                        link: "/santa-says/",
                        icon: "santa-says",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/santa-says/getting-started",
                                    },
                                    {
                                        label: "Gameplay Overview",
                                        link: "/santa-says/gameplay",
                                    },
                                    {
                                        label: "Arena Setup",
                                        link: "/santa-says/arena-setup",
                                    },
                                ],
                            },

                            {
                                label: "Tasks",
                                items: [
                                    {
                                        label: "Participation Tasks",
                                        link: "/santa-says/tasks/participation",
                                    },
                                    {
                                        label: "Placement Tasks",
                                        link: "/santa-says/tasks/placement",
                                    },
                                ],
                            },

                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Player Commands",
                                        link: "/santa-says/commands/player",
                                    },
                                    {
                                        label: "Arena Commands",
                                        link: "/santa-says/commands/arena",
                                    },
                                    {
                                        label: "Admin Commands",
                                        link: "/santa-says/commands/admin",
                                    },
                                    {
                                        label: "Debug Commands",
                                        link: "/santa-says/commands/debug",
                                    },
                                ],
                            },

                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/santa-says/configuration/config"
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/santa-says/configuration/messages"
                                    },
                                    {
                                        label: "scoreboard.yml",
                                        link: "/santa-says/configuration/scoreboard"
                                    },
                                    {
                                        label: "bossbar.yml",
                                        link: "/santa-says/configuration/bossbar"
                                    },
                                    {
                                        label: "items.yml",
                                        link: "/santa-says/configuration/items"
                                    },
                                    {
                                        label: "GUI Menus",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "stats-menu.yml",
                                                link: "/santa-says/configuration/menu/stats"
                                            },
                                            {
                                                label: "setup-menu.yml",
                                                link: "/santa-says/configuration/menu/setup"
                                            },
                                        ]
                                    },
                                    {
                                        label: "mysql.yml",
                                        link: "/santa-says/configuration/mysql"
                                    },
                                    {
                                        label: "Other Files",
                                        link: "/santa-says/configuration/other-files"
                                    },
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {
                                        label: "Sprites & Icons",
                                        link: "/santa-says/features/sprites",
                                    },
                                    {
                                        label: "Smart Recovery",
                                        link: "/santa-says/features/crash-recovery",
                                    },
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {
                                        label: "General Placeholders",
                                        link: "/santa-says/placeholders/general",
                                    },
                                    {
                                        label: "Leaderboard Placeholders",
                                        link: "/santa-says/placeholders/leaderboard",
                                    },
                                ],
                            },
                            {
                                label: "Music",
                                items: [
                                    {
                                        label: "NoteBlockAPI",
                                        link: "/santa-says/music/note-block-api",
                                    },
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {
                                        label: "Santa Says API", link: "/santa-says/api/santa-says-api",
                                    },
                                    {
                                        label: "Player Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "PlayerEvent",
                                                link: "/santa-says/api/player-events/player-event"
                                            },
                                            {
                                                label: "PlayerJoinAttemptEvent",
                                                link: "/santa-says/api/player-events/player-join-attempt-event"
                                            },
                                            {
                                                label: "PlayerLeaveGameEvent",
                                                link: "/santa-says/api/player-events/player-leave-game-event"
                                            },
                                            {
                                                label: "PlayerStatisticChangeEvent",
                                                link: "/santa-says/api/player-events/player-statistic-change-event"
                                            },
                                        ],
                                    },
                                    {
                                        label: "Game Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "GameEvent",
                                                link: "/santa-says/api/game-events/game-event"
                                            },
                                            {
                                                label: "GameStartEvent",
                                                link: "/santa-says/api/game-events/game-start-event"
                                            },
                                            {
                                                label: "GameEndEvent",
                                                link: "/santa-says/api/game-events/game-end-event"
                                            },
                                            {
                                                label: "GameStopEvent",
                                                link: "/santa-says/api/game-events/game-stop-event"
                                            },
                                            {
                                                label: "GameStateChangeEvent",
                                                link: "/santa-says/api/game-events/game-state-change-event"
                                            },
                                        ],
                                    },
                                    {
                                        label: "Round Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "RoundEvent",
                                                link: "/santa-says/api/round-events/round-event"
                                            },
                                            {
                                                label: "RoundStartEvent",
                                                link: "/santa-says/api/round-events/round-start-event"
                                            },
                                            {
                                                label: "RoundEndEvent",
                                                link: "/santa-says/api/round-events/round-end-event"
                                            },
                                        ],
                                    },
                                    {
                                        label: "Task Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "TaskEvent",
                                                link: "/santa-says/api/task-events/task-event"
                                            },
                                            {
                                                label: "TaskStartEvent",
                                                link: "/santa-says/api/task-events/task-start-event"
                                            },
                                            {
                                                label: "TaskEndEvent",
                                                link: "/santa-says/api/task-events/task-end-event"
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {
                                        label: "FAQ",
                                        link: "/santa-says/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "/santa-says/misc/source-code",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: "Advanced Parkour",
                        link: "/advanced-parkour/",
                        icon: "advanced-parkour",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/advanced-parkour/getting-started",
                                    },
                                    {
                                        label: "Gameplay Overview",
                                        link: "/advanced-parkour/gameplay",
                                    },
                                    {
                                        label: "Arena Setup",
                                        link: "/advanced-parkour/arena-setup",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Player Commands",
                                        link: "/advanced-parkour/commands/player",
                                    },
                                    {
                                        label: "Arena Commands",
                                        link: "/advanced-parkour/commands/arena",
                                    },
                                    {
                                        label: "Admin Commands",
                                        link: "/advanced-parkour/commands/admin",
                                    },
                                    {
                                        label: "Debug Commands",
                                        link: "/advanced-parkour/commands/debug",
                                    },
                                ],
                            },
                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/advanced-parkour/configuration/config",
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/advanced-parkour/configuration/messages",
                                    },
                                    {
                                        label: "scoreboard.yml",
                                        link: "/advanced-parkour/configuration/scoreboard",
                                    },
                                    {
                                        label: "bossbar.yml",
                                        link: "/advanced-parkour/configuration/bossbar",
                                    },
                                    {
                                        label: "items.yml",
                                        link: "/advanced-parkour/configuration/items",
                                    },
                                    {
                                        label: "GUI Menus",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "setup-menu.yml",
                                                link: "/advanced-parkour/configuration/menu/setup",
                                            },
                                            {
                                                label: "stats-menu.yml",
                                                link: "/advanced-parkour/configuration/menu/stats",
                                            },
                                        ],
                                    },
                                    {
                                        label: "mysql.yml",
                                        link: "/advanced-parkour/configuration/mysql",
                                    },
                                    {
                                        label: "Other Files",
                                        link: "/advanced-parkour/configuration/other-files",
                                    },
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {
                                        label: "Checkpoint System",
                                        link: "/advanced-parkour/features/checkpoints",
                                    },
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {
                                        label: "General Placeholders",
                                        link: "/advanced-parkour/placeholders/general",
                                    },
                                    {
                                        label: "Leaderboard Placeholders",
                                        link: "/advanced-parkour/placeholders/leaderboard",
                                    },
                                ],
                            },
                            {
                                label: "Music",
                                items: [
                                    {
                                        label: "NoteBlockAPI",
                                        link: "/advanced-parkour/music/note-block-api",
                                    },
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {
                                        label: "Advanced Parkour API",
                                        link: "/advanced-parkour/api/advanced-parkour-api",
                                    },
                                    {
                                        label: "Player Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "PlayerEvent",
                                                link: "/advanced-parkour/api/player-events/player-event",
                                            },
                                            {
                                                label: "PlayerJoinParkourEvent",
                                                link: "/advanced-parkour/api/player-events/player-join-parkour-event",
                                            },
                                            {
                                                label: "PlayerLeaveParkourEvent",
                                                link: "/advanced-parkour/api/player-events/player-leave-parkour-event",
                                            },
                                            {
                                                label: "PlayerCheckpointReachEvent",
                                                link: "/advanced-parkour/api/player-events/player-checkpoint-reach-event",
                                            },
                                            {
                                                label: "PlayerStatisticChangeEvent",
                                                link: "/advanced-parkour/api/player-events/player-statistic-change-event",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {
                                        label: "FAQ",
                                        link: "/advanced-parkour/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "/advanced-parkour/misc/source-code",
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: "Eat Everything",
                        link: "/eat-everything/",
                        icon: "eat-everything",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/eat-everything/getting-started",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Commands & Permissions",
                                        link: "/eat-everything/commands/admin",
                                    },
                                ],
                            },
                            {
                                label: "Configuration",
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/eat-everything/configuration/config",
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/eat-everything/configuration/messages",
                                    },
                                    {
                                        label: "food-components.yml",
                                        link: "/eat-everything/configuration/food-components",
                                    },
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {
                                        label: "Live Item Editing",
                                        link: "/eat-everything/features/live-item-editing",
                                    },
                                    {
                                        label: "Custom Food Components",
                                        link: "/eat-everything/features/custom-food-components",
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {
                                        label: "FAQ",
                                        link: "/eat-everything/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "/eat-everything/misc/source-code",
                                    },
                                ],
                            },
                        ],
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
                                            {
                                                label: "Issue Tracker",
                                                link: "https://github.com/Despical/CommandFramework/issues/new/choose",
                                                attrs: {target: "_blank"}
                                            },
                                            {
                                                label: "Spigot Discussion",
                                                link: "https://spigotmc.org/threads/494383/page-100",
                                                attrs: {target: "_blank"}
                                            },
                                        ]
                                    },
                                    {
                                        label: "Documents",
                                        items: [
                                            {
                                                label: "Javadocs",
                                                link: "https://despical.github.io/CommandFramework/",
                                                attrs: {target: "_blank"}
                                            },
                                        ]
                                    },
                                    {
                                        label: "FAQ",
                                        items: [
                                            {
                                                label: "Relocate the Framework",
                                                slug: "command-framework/relocate-the-framework"
                                            },
                                            {
                                                label: "Register Commands inside a Package",
                                                slug: "command-framework/register-commands-in-a-package"
                                            },
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
