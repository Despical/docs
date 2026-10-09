export type PresetAngle = 'overhead' | 'side' | 'interior';

export interface MazeEnginePreset {
    id: string;
    name: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    algorithm: 'Perfect' | 'Braided';
    complexity: number;
    geometry: {
        pathWidth: number;
        wallThickness: number;
        wallHeight: number;
        roof: boolean;
        footprint: number;
    };
    views: [PresetAngle, PresetAngle, PresetAngle];
    command: string;
    images: { src: string; alt: string; title: string }[];
}

type PresetDefinition = Omit<MazeEnginePreset, 'images' | 'command' | 'views'>;

const presetViewOrder: MazeEnginePreset['views'] = ['side', 'interior', 'overhead'];

// Native geometry and difficulty from the saved 15 x 15, seed 42 photo mazes.
// Every gallery starts with the distant view, followed by the interior and overhead views.
const presetDefinitions: PresetDefinition[] = [
    {
        id: "abyss",
        name: "Abyss",
        description: "Single-file routes descend into the mood of the deep ocean, beneath immense dark walls and a closed ceiling.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.99,
        geometry: { pathWidth: 1, wallThickness: 4, wallHeight: 10, roof: true, footprint: 79 },
    },
    {
        id: "bamboo",
        name: "Bamboo",
        description: "Broad bamboo walks with frequent junctions and plentiful shortcuts.",
        difficulty: "Easy",
        algorithm: "Braided",
        complexity: 0.2,
        geometry: { pathWidth: 6, wallThickness: 1, wallHeight: 3, roof: false, footprint: 106 },
    },
    {
        id: "candy",
        name: "Candy",
        description: "Candy-striped sections in red, white, pink and chocolate tones pair playful colors with many sharp turns.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.5,
        geometry: { pathWidth: 4, wallThickness: 1, wallHeight: 6, roof: false, footprint: 76 },
    },
    {
        id: "catacombs",
        name: "Catacombs",
        description: "Single-file burial tunnels with thick walls, tall ceilings and very few junctions.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 1.0,
        geometry: { pathWidth: 1, wallThickness: 3, wallHeight: 4, roof: true, footprint: 63 },
    },
    {
        id: "claustrophobic",
        name: "Claustrophobic",
        description: "Single-file tunnels with a two-block ceiling leave no room for a full jump.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.95,
        geometry: { pathWidth: 1, wallThickness: 2, wallHeight: 2, roof: true, footprint: 47 },
    },
    {
        id: "copper",
        name: "Copper",
        description: "Compact industrial corridors with a few tricky choices.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.7,
        geometry: { pathWidth: 2, wallThickness: 1, wallHeight: 4, roof: true, footprint: 46 },
    },
    {
        id: "crystal",
        name: "Crystal",
        description: "Spacious crystal halls with towering purple walls and many branching dead ends.",
        difficulty: "Medium",
        algorithm: "Perfect",
        complexity: 0.45,
        geometry: { pathWidth: 5, wallThickness: 2, wallHeight: 9, roof: false, footprint: 107 },
    },
    {
        id: "default",
        name: "Default",
        description: "A balanced stone maze with a few tricky turns.",
        difficulty: "Medium",
        algorithm: "Perfect",
        complexity: 0.7,
        geometry: { pathWidth: 3, wallThickness: 1, wallHeight: 4, roof: false, footprint: 61 },
    },
    {
        id: "desert",
        name: "Desert",
        description: "Open sandy paths with frequent shortcuts.",
        difficulty: "Easy",
        algorithm: "Braided",
        complexity: 0.35,
        geometry: { pathWidth: 4, wallThickness: 1, wallHeight: 4, roof: false, footprint: 76 },
    },
    {
        id: "dungeon",
        name: "Dungeon",
        description: "Narrow passages and long dead ends beneath a dark ceiling.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.9,
        geometry: { pathWidth: 2, wallThickness: 1, wallHeight: 4, roof: true, footprint: 46 },
    },
    {
        id: "end",
        name: "End",
        description: "Pale stone and purple walls surround winding routes with hidden loops.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.65,
        geometry: { pathWidth: 3, wallThickness: 1, wallHeight: 7, roof: false, footprint: 61 },
    },
    {
        id: "factory",
        name: "Factory",
        description: "Narrow industrial lanes beneath a high metal roof, linked by occasional service shortcuts.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.5,
        geometry: { pathWidth: 2, wallThickness: 1, wallHeight: 10, roof: true, footprint: 46 },
    },
    {
        id: "frost",
        name: "Frost",
        description: "Clear icy passages with a few misleading turns.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.6,
        geometry: { pathWidth: 3, wallThickness: 1, wallHeight: 4, roof: false, footprint: 61 },
    },
    {
        id: "gladiator",
        name: "Gladiator",
        description: "Towering arena walls hide long sandstone passages and a few shortcuts.",
        difficulty: "Hard",
        algorithm: "Braided",
        complexity: 0.85,
        geometry: { pathWidth: 3, wallThickness: 3, wallHeight: 12, roof: false, footprint: 93 },
    },
    {
        id: "graveyard",
        name: "Graveyard",
        description: "Thick low stone barriers, weathered grave-like caps and scarce light hide a route full of dead ends.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.88,
        geometry: { pathWidth: 2, wallThickness: 3, wallHeight: 3, roof: false, footprint: 78 },
    },
    {
        id: "haunted",
        name: "Haunted",
        description: "Dim covered corridors, cobweb-topped dark walls and relentless turns make every junction unsettling.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.97,
        geometry: { pathWidth: 2, wallThickness: 1, wallHeight: 5, roof: true, footprint: 46 },
    },
    {
        id: "hedge",
        name: "Hedge",
        description: "Short garden trails with plenty of room to explore.",
        difficulty: "Easy",
        algorithm: "Perfect",
        complexity: 0.55,
        geometry: { pathWidth: 3, wallThickness: 2, wallHeight: 4, roof: false, footprint: 77 },
    },
    {
        id: "library",
        name: "Library",
        description: "Cozy shelf-lined aisles with a low wooden ceiling and long winding dead ends.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.92,
        geometry: { pathWidth: 2, wallThickness: 2, wallHeight: 3, roof: true, footprint: 62 },
    },
    {
        id: "monochrome",
        name: "Monochrome",
        description: "Heavy black-and-white walls form long parallel lanes with rare turns and no shortcuts.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.95,
        geometry: { pathWidth: 3, wallThickness: 4, wallHeight: 5, roof: false, footprint: 109 },
    },
    {
        id: "nether",
        name: "Nether",
        description: "Tight dark paths with many turns to keep track of.",
        difficulty: "Hard",
        algorithm: "Braided",
        complexity: 0.5,
        geometry: { pathWidth: 2, wallThickness: 2, wallHeight: 5, roof: false, footprint: 62 },
    },
    {
        id: "ocean",
        name: "Ocean",
        description: "Bright spacious halls with several ways forward.",
        difficulty: "Easy",
        algorithm: "Braided",
        complexity: 0.55,
        geometry: { pathWidth: 4, wallThickness: 1, wallHeight: 5, roof: true, footprint: 76 },
    },
    {
        id: "rainbow",
        name: "Rainbow",
        description: "Bright color sections alternate concrete and glass, with roomy paths and plenty of shortcuts.",
        difficulty: "Easy",
        algorithm: "Braided",
        complexity: 0.3,
        geometry: { pathWidth: 4, wallThickness: 2, wallHeight: 5, roof: false, footprint: 92 },
    },
    {
        id: "ruins",
        name: "Ruins",
        description: "Very wide mossy trails between low stone ruins, with loops and abundant crossing paths.",
        difficulty: "Easy",
        algorithm: "Braided",
        complexity: 0.15,
        geometry: { pathWidth: 7, wallThickness: 1, wallHeight: 2, roof: false, footprint: 121 },
    },
    {
        id: "sakura",
        name: "Sakura",
        description: "Spacious pink and white paths pass cherry wood and blossom-like leaf caps, with many friendly shortcuts.",
        difficulty: "Easy",
        algorithm: "Braided",
        complexity: 0.2,
        geometry: { pathWidth: 5, wallThickness: 1, wallHeight: 3, roof: false, footprint: 91 },
    },
    {
        id: "sky",
        name: "Sky",
        description: "Cloud-white paths and pale blue glass create an airy island feel, with wide lanes and gentle turns.",
        difficulty: "Easy",
        algorithm: "Perfect",
        complexity: 0.12,
        geometry: { pathWidth: 6, wallThickness: 2, wallHeight: 4, roof: false, footprint: 122 },
    },
    {
        id: "steampunk",
        name: "Steampunk",
        description: "Tall brass-colored caps and weathered copper frame covered industrial lanes, with long routes and occasional loops.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.68,
        geometry: { pathWidth: 3, wallThickness: 2, wallHeight: 7, roof: true, footprint: 77 },
    },
    {
        id: "swamp",
        name: "Swamp",
        description: "Muddy paths wind around low mossy barriers, with tangled loops and dark green stone.",
        difficulty: "Medium",
        algorithm: "Braided",
        complexity: 0.6,
        geometry: { pathWidth: 3, wallThickness: 2, wallHeight: 3, roof: false, footprint: 77 },
    },
    {
        id: "temple",
        name: "Temple",
        description: "Long twisting halls that reward careful navigation.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.9,
        geometry: { pathWidth: 3, wallThickness: 2, wallHeight: 7, roof: true, footprint: 77 },
    },
    {
        id: "volcanic",
        name: "Volcanic",
        description: "Towering basalt and magma walls contain sealed lava pockets behind dark glass. Few shortcuts offer relief.",
        difficulty: "Hard",
        algorithm: "Perfect",
        complexity: 0.9,
        geometry: { pathWidth: 2, wallThickness: 3, wallHeight: 8, roof: true, footprint: 78 },
    },
    {
        id: "wilderness",
        name: "Wilderness",
        description: "Wide forest trails through autumn-colored leaves, with branching dead ends.",
        difficulty: "Medium",
        algorithm: "Perfect",
        complexity: 0.75,
        geometry: { pathWidth: 3, wallThickness: 2, wallHeight: 4, roof: false, footprint: 77 },
    },
];

const viewTitles: Record<PresetAngle, string> = {
    overhead: 'Overhead view',
    side: 'Side view',
    interior: 'Interior view',
};

function describeView(preset: PresetDefinition, angle: PresetAngle): string {
    if (angle === 'overhead') {
        return `The complete ${preset.name} maze viewed directly from above${preset.geometry.roof ? ', with its ceiling temporarily removed to reveal the paths' : ''}`;
    }
    if (angle === 'side') {
        return `A distant side view of the ${preset.name} maze showing its wall height and materials`;
    }
    return `Inside the ${preset.name} maze, at corridor level${preset.geometry.roof ? ', with the ceiling restored and night vision used to show the block textures' : ''}`;
}

export const mazeEnginePresets: MazeEnginePreset[] = presetDefinitions.map((preset) => ({
    ...preset,
    views: presetViewOrder,
    command: `/maze create ${preset.id}_demo 15 15 --preset ${preset.id} --seed 42`,
    images: presetViewOrder.map((angle) => ({
        src: `/images/mazeengine/presets/${preset.id}-${angle}.webp`,
        title: viewTitles[angle],
        alt: describeView(preset, angle),
    })),
}));

export function getMazeEnginePreset(id: string): MazeEnginePreset {
    const preset = mazeEnginePresets.find((candidate) => candidate.id === id);
    if (!preset) throw new Error(`Unknown Maze Engine preset: ${id}`);
    return preset;
}
