// @ts-check
import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
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
        sitemap(),
        starlight({
            title: 'Despical Docs',
            favicon: '/favicon.svg',
            description: "Official documentation for Despical's Minecraft plugins, developer tools, frameworks, setup guides, API references, and operational notes.",
            social: [
                {icon: 'github', label: 'home:GitHub', href: 'https://github.com/Despical'},
                {icon: 'seti:java', label: 'home:Javadoc', href: 'https://javadoc.despical.dev/'},
                {icon: 'discord', label: 'home:Discord', href: 'https://discord.gg/uXVU8jmtpU'},
                {icon: 'patreon', label: 'home:Patreon', href: 'https://patreon.com/despical'},
                {
                    icon: "external",
                    label: "advanced-parkour:SpigotMC",
                    href: "https://www.spigotmc.org/resources/advanced-parkour.133887/",
                },
                {
                    icon: "external",
                    label: "advanced-parkour:BuiltByBit",
                    href: "https://builtbybit.com/resources/advanced-parkour.101133/",
                },
                {
                    icon: "external",
                    label: "carousel:SpigotMC",
                    href: "https://www.spigotmc.org/resources/carousel.116224/",
                },
                {
                    icon: "external",
                    label: "carousel:BuiltByBit",
                    href: "https://builtbybit.com/resources/carousel.50204/",
                },
                {
                    icon: "github",
                    label: "command-framework:Github",
                    href: "https://github.com/Despical/CommandFramework",
                },
                {
                    icon: "seti:java",
                    label: "command-framework:Javadoc",
                    href: "https://javadoc.despical.dev/command-framework/"
                },
                {
                    icon: "external",
                    label: "command-framework:SpigotMC",
                    href: "https://spigotmc.org/resources/89933/",
                },
                {
                    icon: "external",
                    label: "easter-eggs:SpigotMC",
                    href: "https://www.spigotmc.org/resources/eastereggs.116086/",
                },
                {
                    icon: "external",
                    label: "easter-eggs:BuiltByBit",
                    href: "https://builtbybit.com/resources/easter-eggs.50201/",
                },
                {
                    icon: "external",
                    label: "eat-everything:SpigotMC",
                    href: "https://www.spigotmc.org/resources/eat-everything.116884/",
                },
                {
                    icon: "external",
                    label: "eat-everything:BuiltByBit",
                    href: "https://builtbybit.com/resources/eat-everything.50202/",
                },
                {
                    icon: "github",
                    label: "spigot-webhook:GitHub",
                    href: "https://github.com/Despical/SpigotSalesWebhook",
                },
                {
                    icon: "github",
                    label: "particle-text:GitHub",
                    href: "https://github.com/Despical/ParticleText",
                },
                {
                    icon: "seti:java",
                    label: "particle-text:Javadoc",
                    href: "https://javadoc.despical.dev/particle-text/",
                },
                {
                    icon: "external",
                    label: "particle-text:SpigotMC",
                    href: "https://www.spigotmc.org/resources/particle-text.110996/",
                },
                {
                    icon: "external",
                    label: "particle-text:BuiltByBit",
                    href: "https://builtbybit.com/resources/particle-text.50324/",
                },
                {
                    icon: "github",
                    label: "tnt-run:GitHub",
                    href: "https://github.com/Despical/TNTRun",
                },
                {
                    icon: "seti:java",
                    label: "tnt-run:Javadoc",
                    href: "https://javadoc.despical.dev/tnt-run/",
                },
                {
                    icon: "external",
                    label: "tnt-run:SpigotMC",
                    href: "https://www.spigotmc.org/resources/tnt-run.83196/",
                },
                {
                    icon: "external",
                    label: "tnt-run:BuiltByBit",
                    href: "https://builtbybit.com/resources/tnt-run.116706/",
                },
                {
                    icon: "github",
                    label: "kotl:GitHub",
                    href: "https://github.com/Despical/KOTL",
                },
                {
                    icon: "seti:java",
                    label: "kotl:Javadoc",
                    href: "https://javadoc.despical.dev/kotl/",
                },
                {
                    icon: "external",
                    label: "kotl:SpigotMC",
                    href: "https://www.spigotmc.org/resources/king-of-the-ladder.80686/",
                },
                {
                    icon: "external",
                    label: "kotl:BuiltByBit",
                    href: "https://builtbybit.com/resources/king-of-the-ladder.51128/",
                },
                {
                    icon: "external",
                    label: "item-upgrader:SpigotMC",
                    href: "https://www.spigotmc.org/resources/116575/",
                },
                {
                    icon: "external",
                    label: "item-upgrader:BuiltByBit",
                    href: "https://builtbybit.com/resources/item-upgrader-oraxen-itemsadder.50263/",
                },
                {
                    icon: "external",
                    label: "santa-says:SpigotMC",
                    href: "https://www.spigotmc.org/resources/santa-says.132658/",
                },
                {
                    icon: "external",
                    label: "santa-says:BuiltByBit",
                    href: "https://builtbybit.com/resources/santa-says-christmas-minigame.94410/",
                },
                {
                    icon: "external",
                    label: "the-snake:SpigotMC",
                    href: "https://www.spigotmc.org/resources/the-snake.120508/",
                },
                {
                    icon: "external",
                    label: "tnt-tag:SpigotMC",
                    href: "https://www.spigotmc.org/resources/117862/",
                },
                {
                    icon: "external",
                    label: "tnt-tag:BuiltByBit",
                    href: "https://builtbybit.com/resources/tnt-tag.50271/",
                },
                {
                    icon: "external",
                    label: "warden-party:SpigotMC",
                    href: "https://www.spigotmc.org/resources/warden-party.117447/",
                },
                {
                    icon: "external",
                    label: "warden-party:BuiltByBit",
                    href: "https://builtbybit.com/resources/warden-party.50166/",
                },
                {
                    icon: "github",
                    label: "whack-me:GitHub",
                    href: "https://github.com/Despical/WhackMe",
                },
                {
                    icon: "seti:java",
                    label: "whack-me:Javadoc",
                    href: "https://javadoc.despical.dev/whack-me/",
                },
                {
                    icon: "external",
                    label: "whack-me:SpigotMC",
                    href: "https://www.spigotmc.org/resources/whack-me.104912/",
                },
                {
                    icon: "external",
                    label: "whack-me:BuiltByBit",
                    href: "https://builtbybit.com/resources/whack-me.50294/",
                },
                {
                    icon: "external",
                    label: "marketplace:SpigotMC",
                    href: "https://www.spigotmc.org/resources/authors/despical.615094/",
                },
                {
                    icon: "external",
                    label: "marketplace:BuiltByBit",
                    href: "https://builtbybit.com/creators/despical.257098/",
                },
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
                                        label: "signs.yml",
                                        link: "/santa-says/configuration/signs"
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
                        label: "Whack Me",
                        id: "whack-me",
                        link: "/whack-me/",
                        icon: "whack-me",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {label: "Getting Started", link: "/whack-me/getting-started"},
                                    {label: "Gameplay Overview", link: "/whack-me/gameplay"},
                                    {label: "Arena Setup", link: "/whack-me/arena-setup"},
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {label: "Player Commands", link: "/whack-me/commands/player"},
                                    {label: "Arena Commands", link: "/whack-me/commands/arena"},
                                    {label: "Admin Commands", link: "/whack-me/commands/admin"},
                                    {label: "Debug Commands", link: "/whack-me/commands/debug"},
                                ],
                            },
                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {label: "config.yml", link: "/whack-me/configuration/config"},
                                    {label: "messages.yml", link: "/whack-me/configuration/messages"},
                                    {label: "scoreboard.yml", link: "/whack-me/configuration/scoreboard"},
                                    {label: "bossbar.yml", link: "/whack-me/configuration/bossbar"},
                                    {label: "signs.yml", link: "/whack-me/configuration/signs"},
                                    {label: "sounds.yml", link: "/whack-me/configuration/sounds"},
                                    {label: "mysql.yml", link: "/whack-me/configuration/mysql"},
                                    {
                                        label: "GUI Menus",
                                        collapsed: true,
                                        items: [
                                            {label: "setup-menu.yml", link: "/whack-me/configuration/menu/setup"},
                                            {label: "stats-menu.yml", link: "/whack-me/configuration/menu/stats"},
                                        ],
                                    },
                                    {label: "Other Files", link: "/whack-me/configuration/other-files"},
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {label: "Point Blocks", link: "/whack-me/features/point-blocks"},
                                    {label: "Statistics & Records", link: "/whack-me/features/statistics-and-records"},
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {label: "General Placeholders", link: "/whack-me/placeholders/general"},
                                    {label: "Leaderboard Placeholders", link: "/whack-me/placeholders/leaderboard"},
                                ],
                            },
                            {
                                label: "Music",
                                items: [
                                    {label: "NoteBlockAPI", link: "/whack-me/music/note-block-api"},
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {label: "Whack Me API", link: "/whack-me/api/whack-me-api"},
                                    {
                                        label: "Game Events",
                                        collapsed: true,
                                        items: [
                                            {label: "GameEvent", link: "/whack-me/api/game-events/game-event"},
                                            {label: "GameStartEvent", link: "/whack-me/api/game-events/game-start-event"},
                                            {label: "GameEndEvent", link: "/whack-me/api/game-events/game-end-event"},
                                            {label: "GameStopEvent", link: "/whack-me/api/game-events/game-stop-event"},
                                            {label: "GameStateChangeEvent", link: "/whack-me/api/game-events/game-state-change-event"},
                                        ],
                                    },
                                    {
                                        label: "Player Events",
                                        collapsed: true,
                                        items: [
                                            {label: "PlayerEvent", link: "/whack-me/api/player-events/player-event"},
                                            {label: "PlayerJoinAttemptEvent", link: "/whack-me/api/player-events/player-join-attempt-event"},
                                            {label: "PlayerLeaveGameEvent", link: "/whack-me/api/player-events/player-leave-game-event"},
                                            {label: "PlayerStatisticChangeEvent", link: "/whack-me/api/player-events/player-statistic-change-event"},
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {label: "FAQ", link: "/whack-me/misc/faq"},
                                    {
                                        label: "Source Code",
                                        link: "https://github.com/Despical/WhackMe",
                                        attrs: {target: "_blank"},
                                    },
                                    {
                                        label: "Create an Issue",
                                        link: "https://github.com/Despical/WhackMe/issues/new/choose",
                                        attrs: {target: "_blank"},
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: "Item Upgrader",
                        id: "item-upgrader",
                        link: "/item-upgrader/",
                        icon: "item-upgrader",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {label: "Getting Started", link: "/item-upgrader/getting-started"},
                                    {label: "Upgrade Flow", link: "/item-upgrader/upgrade-flow"},
                                    {label: "Creating Upgrades", link: "/item-upgrader/creating-upgrades"},
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {label: "Player Commands", link: "/item-upgrader/commands/player"},
                                    {label: "Admin Commands", link: "/item-upgrader/commands/admin"},
                                    {label: "Debug Commands", link: "/item-upgrader/commands/debug"},
                                ],
                            },
                            {
                                label: "Configuration",
                                items: [
                                    {label: "config.yml", link: "/item-upgrader/configuration/config"},
                                    {label: "messages.yml", link: "/item-upgrader/configuration/messages"},
                                    {label: "upgrades.yml", link: "/item-upgrader/configuration/upgrades"},
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {label: "Chances and Economy", link: "/item-upgrader/features/chances-and-economy"},
                                    {label: "Required Items", link: "/item-upgrader/features/required-items"},
                                    {label: "Enchantments and Metadata", link: "/item-upgrader/features/enchantments-and-metadata"},
                                    {label: "Custom Items", link: "/item-upgrader/features/custom-items"},
                                    {label: "Chained Upgrades", link: "/item-upgrader/features/chained-upgrades"},
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {label: "FAQ", link: "/item-upgrader/misc/faq"},
                                ],
                            },
                        ],
                    },
                    {
                        label: "The Snake",
                        id: "the-snake",
                        link: "/the-snake/",
                        icon: "the-snake",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {label: "Getting Started", link: "/the-snake/getting-started"},
                                    {label: "Gameplay Overview", link: "/the-snake/gameplay"},
                                    {label: "Arena Setup", link: "/the-snake/arena-setup"},
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {label: "Player Commands", link: "/the-snake/commands/player"},
                                    {label: "Arena Commands", link: "/the-snake/commands/arena"},
                                ],
                            },
                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {label: "config.yml", link: "/the-snake/configuration/config"},
                                    {label: "mysql.yml", link: "/the-snake/configuration/mysql"},
                                    {label: "arena.yml", link: "/the-snake/configuration/arena"},
                                    {label: "Other Files", link: "/the-snake/configuration/other-files"},
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {label: "Controls and Movement", link: "/the-snake/features/controls-and-movement"},
                                    {label: "Arena Options", link: "/the-snake/features/arena-options"},
                                    {label: "Statistics and Leaderboards", link: "/the-snake/features/statistics-and-leaderboards"},
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {label: "General Placeholders", link: "/the-snake/placeholders/general"},
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {label: "The Snake API", link: "/the-snake/api/the-snake-api"},
                                    {
                                        label: "Events",
                                        collapsed: true,
                                        items: [
                                            {label: "SnakeEvent", link: "/the-snake/api/events/snake-event"},
                                            {label: "GameStartEvent", link: "/the-snake/api/events/game-start-event"},
                                            {label: "GameEndEvent", link: "/the-snake/api/events/game-end-event"},
                                            {label: "GameStateChangeEvent", link: "/the-snake/api/events/game-state-change-event"},
                                            {label: "KeyPressedEvent", link: "/the-snake/api/events/key-pressed-event"},
                                            {label: "NewScoreEvent", link: "/the-snake/api/events/new-score-event"},
                                            {label: "StatisticChangeEvent", link: "/the-snake/api/events/statistic-change-event"},
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {label: "FAQ", link: "/the-snake/misc/faq"},
                                ],
                            },
                        ],
                    },
                    {
                        label: "TNT Tag",
                        id: "tnt-tag",
                        link: "/tnt-tag/",
                        icon: "tnt-tag",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {label: "Getting Started", link: "/tnt-tag/getting-started"},
                                    {label: "Gameplay Overview", link: "/tnt-tag/gameplay"},
                                    {label: "Arena Setup", link: "/tnt-tag/arena-setup"},
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {label: "Player Commands", link: "/tnt-tag/commands/player"},
                                    {label: "Arena Commands", link: "/tnt-tag/commands/arena"},
                                    {label: "Admin Commands", link: "/tnt-tag/commands/admin"},
                                ],
                            },
                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {label: "config.yml", link: "/tnt-tag/configuration/config"},
                                    {label: "messages.yml", link: "/tnt-tag/configuration/messages"},
                                    {label: "items.yml", link: "/tnt-tag/configuration/items"},
                                    {label: "power-ups.yml", link: "/tnt-tag/configuration/power-ups"},
                                    {label: "rewards.yml", link: "/tnt-tag/configuration/rewards"},
                                    {label: "mysql.yml", link: "/tnt-tag/configuration/mysql"},
                                    {label: "bungee.yml", link: "/tnt-tag/configuration/bungee"},
                                    {label: "arena.yml", link: "/tnt-tag/configuration/arena"},
                                    {label: "Other Files", link: "/tnt-tag/configuration/other-files"},
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {label: "Tagging and Rounds", link: "/tnt-tag/features/tagging-and-rounds"},
                                    {label: "Deathmatch", link: "/tnt-tag/features/deathmatch"},
                                    {label: "Spectator Mode", link: "/tnt-tag/features/spectator-mode"},
                                    {label: "Power-Ups", link: "/tnt-tag/features/power-ups"},
                                    {label: "Join Signs", link: "/tnt-tag/features/signs"},
                                    {label: "Statistics and Leaderboards", link: "/tnt-tag/features/statistics-and-leaderboards"},
                                    {label: "Bungee Mode", link: "/tnt-tag/features/bungee-mode"},
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {label: "General Placeholders", link: "/tnt-tag/placeholders/general"},
                                    {label: "Leaderboard Placeholders", link: "/tnt-tag/placeholders/leaderboard"},
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {label: "TNT Tag API", link: "/tnt-tag/api/tnt-tag-api"},
                                    {
                                        label: "Events",
                                        collapsed: true,
                                        items: [
                                            {label: "TNTTagEvent", link: "/tnt-tag/api/events/tnt-tag-event"},
                                            {label: "GameStartEvent", link: "/tnt-tag/api/events/game-start-event"},
                                            {label: "GameStateChangeEvent", link: "/tnt-tag/api/events/game-state-change-event"},
                                            {label: "GameStopEvent", link: "/tnt-tag/api/events/game-stop-event"},
                                            {label: "JoinAttemptEvent", link: "/tnt-tag/api/events/join-attempt-event"},
                                            {label: "LeaveAttemptEvent", link: "/tnt-tag/api/events/leave-attempt-event"},
                                            {label: "RoundStartEvent", link: "/tnt-tag/api/events/round-start-event"},
                                            {label: "PlayerEliminatedEvent", link: "/tnt-tag/api/events/player-eliminated-event"},
                                            {label: "StatisticChangeEvent", link: "/tnt-tag/api/events/statistic-change-event"},
                                        ],
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {label: "FAQ", link: "/tnt-tag/misc/faq"},
                                ],
                            },
                        ],
                    },
                    {
                        label: "Particle Text",
                        id: "particle-text",
                        link: "/particle-text/",
                        icon: "particle-text",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {label: "Getting Started", link: "/particle-text/getting-started"},
                                    {label: "Creating Renderers", link: "/particle-text/creating-renderers"},
                                ],
                            },
                            {
                                label: "Mechanics",
                                items: [
                                    {label: "Rendering and Performance", link: "/particle-text/mechanics/rendering-and-performance"},
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {label: "Admin Commands", link: "/particle-text/commands/admin"},
                                ],
                            },
                            {
                                label: "Configuration",
                                items: [
                                    {label: "config.yml", link: "/particle-text/configuration/config"},
                                    {label: "messages.yml", link: "/particle-text/configuration/messages"},
                                    {label: "renderers.yml", link: "/particle-text/configuration/renderers"},
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {label: "PlaceholderAPI", link: "/particle-text/placeholders/general"},
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {label: "FAQ", link: "/particle-text/misc/faq"},
                                    {label: "Source Code", link: "https://github.com/Despical/ParticleText"},
                                ],
                            },
                        ],
                    },
                    {
                        label: "TNT Run",
                        id: "tnt-run",
                        link: "/tnt-run/",
                        icon: "tnt-run",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/tnt-run/getting-started",
                                    },
                                    {
                                        label: "Gameplay Overview",
                                        link: "/tnt-run/gameplay",
                                    },
                                    {
                                        label: "Arena Setup",
                                        link: "/tnt-run/arena-setup",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Player Commands",
                                        link: "/tnt-run/commands/player",
                                    },
                                    {
                                        label: "Arena Commands",
                                        link: "/tnt-run/commands/arena",
                                    },
                                    {
                                        label: "Admin Commands",
                                        link: "/tnt-run/commands/admin",
                                    },
                                    {
                                        label: "Debug Commands",
                                        link: "/tnt-run/commands/debug",
                                    },
                                ],
                            },
                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/tnt-run/configuration/config",
                                    },
                                    {
                                        label: "block-removal.yml",
                                        link: "/tnt-run/configuration/block-removal",
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/tnt-run/configuration/messages",
                                    },
                                    {
                                        label: "scoreboard.yml",
                                        link: "/tnt-run/configuration/scoreboard",
                                    },
                                    {
                                        label: "bossbar.yml",
                                        link: "/tnt-run/configuration/bossbar",
                                    },
                                    {
                                        label: "items.yml",
                                        link: "/tnt-run/configuration/items",
                                    },
                                    {
                                        label: "signs.yml",
                                        link: "/tnt-run/configuration/signs",
                                    },
                                    {
                                        label: "sounds.yml",
                                        link: "/tnt-run/configuration/sounds",
                                    },
                                    {
                                        label: "mysql.yml",
                                        link: "/tnt-run/configuration/mysql",
                                    },
                                    {
                                        label: "GUI Menus",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "stats-menu.yml",
                                                link: "/tnt-run/configuration/menu/stats",
                                            },
                                            {
                                                label: "setup-menu.yml",
                                                link: "/tnt-run/configuration/menu/setup",
                                            },
                                            {
                                                label: "spectator-settings-menu.yml",
                                                link: "/tnt-run/configuration/menu/spectator-settings",
                                            },
                                            {
                                                label: "spectator-teleporter-menu.yml",
                                                link: "/tnt-run/configuration/menu/spectator-teleporter",
                                            },
                                        ],
                                    },
                                    {
                                        label: "Other Files",
                                        link: "/tnt-run/configuration/other-files",
                                    },
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {
                                        label: "Double Jumps",
                                        link: "/tnt-run/features/double-jumps",
                                    },
                                    {
                                        label: "Block Removal & Recovery",
                                        link: "/tnt-run/features/block-safety",
                                    },
                                    {
                                        label: "Spectator Mode",
                                        link: "/tnt-run/features/spectator-mode",
                                    },
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {
                                        label: "General Placeholders",
                                        link: "/tnt-run/placeholders/general",
                                    },
                                    {
                                        label: "Leaderboard Placeholders",
                                        link: "/tnt-run/placeholders/leaderboard",
                                    },
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {
                                        label: "TNT Run API",
                                        link: "/tnt-run/api/tnt-run-api",
                                    },
                                    {
                                        label: "Game Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "GameEvent",
                                                link: "/tnt-run/api/game-events/game-event",
                                            },
                                            {
                                                label: "GameStartEvent",
                                                link: "/tnt-run/api/game-events/game-start-event",
                                            },
                                            {
                                                label: "GameEndEvent",
                                                link: "/tnt-run/api/game-events/game-end-event",
                                            },
                                            {
                                                label: "GameStopEvent",
                                                link: "/tnt-run/api/game-events/game-stop-event",
                                            },
                                            {
                                                label: "GameStateChangeEvent",
                                                link: "/tnt-run/api/game-events/game-state-change-event",
                                            },
                                        ],
                                    },
                                    {
                                        label: "Player Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "PlayerEvent",
                                                link: "/tnt-run/api/player-events/player-event",
                                            },
                                            {
                                                label: "PlayerJoinAttemptEvent",
                                                link: "/tnt-run/api/player-events/player-join-attempt-event",
                                            },
                                            {
                                                label: "PlayerLeaveGameEvent",
                                                link: "/tnt-run/api/player-events/player-leave-game-event",
                                            },
                                            {
                                                label: "PlayerDoubleJumpEvent",
                                                link: "/tnt-run/api/player-events/player-double-jump-event",
                                            },
                                            {
                                                label: "PlayerEliminateEvent",
                                                link: "/tnt-run/api/player-events/player-eliminate-event",
                                            },
                                            {
                                                label: "PlayerStatisticChangeEvent",
                                                link: "/tnt-run/api/player-events/player-statistic-change-event",
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
                                        link: "/tnt-run/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "https://github.com/Despical/TNTRun",
                                        attrs: {target: "_blank"},
                                    },
                                    {
                                        label: "Create an Issue",
                                        link: "https://github.com/Despical/TNTRun/issues/new/choose",
                                        attrs: {target: "_blank"},
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: "KOTL",
                        id: "kotl",
                        link: "/kotl/",
                        icon: "kotl",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/kotl/getting-started",
                                    },
                                    {
                                        label: "Gameplay Overview",
                                        link: "/kotl/gameplay",
                                    },
                                    {
                                        label: "Arena Setup",
                                        link: "/kotl/arena-setup",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Player Commands",
                                        link: "/kotl/commands/player",
                                    },
                                    {
                                        label: "Arena Commands",
                                        link: "/kotl/commands/arena",
                                    },
                                    {
                                        label: "Admin Commands",
                                        link: "/kotl/commands/admin",
                                    },
                                    {
                                        label: "Debug Commands",
                                        link: "/kotl/commands/debug",
                                    },
                                ],
                            },
                            {
                                label: "Configuration",
                                collapsed: true,
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/kotl/configuration/config",
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/kotl/configuration/messages",
                                    },
                                    {
                                        label: "scoreboard.yml",
                                        link: "/kotl/configuration/scoreboard",
                                    },
                                    {
                                        label: "bossbar.yml",
                                        link: "/kotl/configuration/bossbar",
                                    },
                                    {
                                        label: "items.yml",
                                        link: "/kotl/configuration/items",
                                    },
                                    {
                                        label: "mysql.yml",
                                        link: "/kotl/configuration/mysql",
                                    },
                                    {
                                        label: "GUI Menus",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "stats-menu.yml",
                                                link: "/kotl/configuration/menu/stats",
                                            },
                                            {
                                                label: "setup-menu.yml",
                                                link: "/kotl/configuration/menu/setup",
                                            },
                                        ],
                                    },
                                    {
                                        label: "Other Files",
                                        link: "/kotl/configuration/other-files",
                                    },
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {
                                        label: "King Mechanics",
                                        link: "/kotl/features/king-mechanics",
                                    },
                                    {
                                        label: "Arena Detection & Player State",
                                        link: "/kotl/features/arena-detection",
                                    },
                                    {
                                        label: "Statistics & Records",
                                        link: "/kotl/features/statistics-and-records",
                                    },
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {
                                        label: "General Placeholders",
                                        link: "/kotl/placeholders/general",
                                    },
                                    {
                                        label: "Leaderboard Placeholders",
                                        link: "/kotl/placeholders/leaderboard",
                                    },
                                ],
                            },
                            {
                                label: "Developer API",
                                collapsed: true,
                                items: [
                                    {
                                        label: "KOTL API",
                                        link: "/kotl/api/kotl-api",
                                    },
                                    {
                                        label: "Game Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "GameEvent",
                                                link: "/kotl/api/game-events/game-event",
                                            },
                                            {
                                                label: "GameStopEvent",
                                                link: "/kotl/api/game-events/game-stop-event",
                                            },
                                        ],
                                    },
                                    {
                                        label: "Player Events",
                                        collapsed: true,
                                        items: [
                                            {
                                                label: "PlayerEvent",
                                                link: "/kotl/api/player-events/player-event",
                                            },
                                            {
                                                label: "PlayerEnterArenaEvent",
                                                link: "/kotl/api/player-events/player-enter-arena-event",
                                            },
                                            {
                                                label: "PlayerLeaveArenaEvent",
                                                link: "/kotl/api/player-events/player-leave-arena-event",
                                            },
                                            {
                                                label: "PlayerBecomeKingEvent",
                                                link: "/kotl/api/player-events/player-become-king-event",
                                            },
                                            {
                                                label: "PlayerStatisticChangeEvent",
                                                link: "/kotl/api/player-events/player-statistic-change-event",
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
                                        link: "/kotl/misc/faq",
                                    },
                                    {
                                        label: "Source Code",
                                        link: "https://github.com/Despical/KOTL",
                                        attrs: {target: "_blank"},
                                    },
                                    {
                                        label: "Create an Issue",
                                        link: "https://github.com/Despical/KOTL/issues/new/choose",
                                        attrs: {target: "_blank"},
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        label: "Warden Party",
                        link: "/warden-party/",
                        icon: "warden-party",
                        items: [
                            {
                                label: "Basics",
                                items: [
                                    {
                                        label: "Getting Started",
                                        link: "/warden-party/getting-started",
                                    },
                                    {
                                        label: "Gameplay Overview",
                                        link: "/warden-party/gameplay",
                                    },
                                ],
                            },
                            {
                                label: "Commands",
                                items: [
                                    {
                                        label: "Admin Commands",
                                        link: "/warden-party/commands/admin",
                                    },
                                ],
                            },
                            {
                                label: "Configuration",
                                items: [
                                    {
                                        label: "config.yml",
                                        link: "/warden-party/configuration/config",
                                    },
                                    {
                                        label: "messages.yml",
                                        link: "/warden-party/configuration/messages",
                                    },
                                ],
                            },
                            {
                                label: "Features",
                                items: [
                                    {
                                        label: "Schedulers",
                                        link: "/warden-party/features/schedulers",
                                    },
                                    {
                                        label: "Natural Spawning",
                                        link: "/warden-party/features/natural-spawning",
                                    },
                                    {
                                        label: "Phantom Phase",
                                        link: "/warden-party/features/phantom-phase",
                                    },
                                    {
                                        label: "Rewards & Commands",
                                        link: "/warden-party/features/rewards-and-commands",
                                    },
                                ],
                            },
                            {
                                label: "Placeholders",
                                items: [
                                    {
                                        label: "General Placeholders",
                                        link: "/warden-party/placeholders/general",
                                    },
                                ],
                            },
                            {
                                label: "Miscellaneous",
                                items: [
                                    {
                                        label: "FAQ",
                                        link: "/warden-party/misc/faq",
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
                        label: "Spigot Sales Webhook",
                        link: "/spigot-webhook/",
                        icon: "spigot-webhook",
                        items: [
                            {
                                label: "Spigot Sales Webhook",
                                items: [
                                    {
                                        label: "Basics",
                                        items: [
                                            {label: "Overview", slug: "spigot-webhook"},
                                            {label: "Getting Started", slug: "spigot-webhook/getting-started"},
                                            {label: "Configuration", slug: "spigot-webhook/configuration"},
                                        ],
                                    },
                                    {
                                        label: "Operation",
                                        items: [
                                            {label: "Running the Worker", slug: "spigot-webhook/running"},
                                            {label: "Docker", slug: "spigot-webhook/docker"},
                                            {label: "State File", slug: "spigot-webhook/state-file"},
                                        ],
                                    },
                                    {
                                        label: "Troubleshooting",
                                        items: [
                                            {label: "Troubleshooting", slug: "spigot-webhook/troubleshooting"},
                                            {
                                                label: "Create an Issue",
                                                link: "https://github.com/Despical/SpigotSalesWebhook/issues/new/choose",
                                                attrs: {target: "_blank"},
                                            },
                                        ],
                                    },
                                    {
                                        label: "Project",
                                        items: [
                                            {
                                                label: "GitHub Repository",
                                                link: "https://github.com/Despical/SpigotSalesWebhook",
                                                attrs: {target: "_blank"},
                                            },
                                            {
                                                label: "Contributing",
                                                link: "https://github.com/Despical/SpigotSalesWebhook/blob/main/CONTRIBUTING.md",
                                                attrs: {target: "_blank"},
                                            },
                                            {
                                                label: "Security Policy",
                                                link: "https://github.com/Despical/SpigotSalesWebhook/blob/main/SECURITY.md",
                                                attrs: {target: "_blank"},
                                            },
                                        ],
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
                                        label: "Command Core",
                                        items: [
                                            {label: "Command Arguments", slug: 'command-framework/command-arguments'},
                                            {label: "Subcommands & Error Messages", slug: 'command-framework/subcommands-and-error-messages'},
                                            {label: "Command Cooldowns", slug: 'command-framework/command-cooldowns'},
                                        ]
                                    },
                                    {
                                        label: "Customization",
                                        items: [
                                            {label: "Custom Parameters", slug: 'command-framework/custom-parameters'},
                                            {label: "Custom Command Arguments", slug: 'command-framework/custom-command-arguments'},
                                            {label: "Message Formatting", slug: 'command-framework/message-formatting'},
                                            {label: "Runtime Command Attributes", slug: 'command-framework/runtime-command-attributes'},
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
                                                link: "https://javadoc.despical.dev/command-framework/",
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
                ], {
                    topics: {
                        "tnt-run": ["/tnt-run/misc/source-code", "/tnt-run/configuration/menus"],
                        "kotl": ["/kotl/misc/source-code", "/kotl/configuration/menus"],
                        "whack-me": ["/whack-me/configuration/menus"],
                    },
                })
            ],
            head: [
                {
                    tag: 'meta',
                    attrs: { name: 'twitter:card', content: 'summary' },
                },
                {
                    tag: 'meta',
                    attrs: { property: 'og:type', content: 'website' },
                },
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
