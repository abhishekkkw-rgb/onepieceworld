export type Affiliation = 'Pirate' | 'Marine' | 'World Government' | 'Revolutionary Army' | 'Cross Guild';

export type SeaRegion = 
  | 'East Blue'
  | 'West Blue'
  | 'North Blue'
  | 'South Blue'
  | 'Grand Line (Paradise)'
  | 'New World'
  | 'Sky Island'
  | 'Calm Belt'
  | 'Red Line';

export interface Character {
  id: string;
  name: string;
  japaneseName?: string;
  epithet: string;
  role: string;
  crew: string;
  affiliation: Affiliation;
  bountyNumeric: number;
  bountyFormatted: string;
  image: string;
  devilFruit?: {
    name: string;
    japaneseName?: string;
    type: 'Paramecia' | 'Zoan' | 'Ancient Zoan' | 'Mythical Zoan' | 'Logia' | 'Artificial SMILE' | 'Logia & Paramecia' | 'Special Dual Fruit';
    awakened?: boolean;
    description: string;
  };
  haki: {
    conquerors: boolean;
    armament: boolean;
    observation: boolean;
    advancedNotes?: string;
  };
  originSea: SeaRegion;
  status: 'Active' | 'Deceased' | 'Imprisoned' | 'Disbanded';
  keyAbilities: string[];
  quote: string;
  lore: string;
  signatureWeapon?: string;
  rank?: string; // For Marines (Fleet Admiral, Admiral, Vice Admiral, etc.)
  crossGuildStars?: number; // For Marines wanted by Cross Guild
}

export interface Crew {
  id: string;
  name: string;
  japaneseName?: string;
  captain: string;
  flagImage: string;
  bannerImage: string;
  ship: string;
  motto: string;
  totalBountyFormatted: string;
  totalBountyNumeric: number;
  yonkoStatus?: boolean;
  status: 'Active' | 'Disbanded' | 'Reorganized';
  description: string;
  keyFeats: string[];
  prominentMembers: string[];
}

export interface MarineFaction {
  id: string;
  name: string;
  leader: string;
  motto: string;
  philosophy: string;
  description: string;
  hqLocation: string;
  keyForces: string[];
  keyBases: string[];
}

export interface IslandHistory {
  id: string;
  name: string;
  japaneseName?: string;
  sea: SeaRegion;
  saga: string;
  arcName: string;
  episodeRange: string;
  orderVisited: number;
  coordinates: { x: number; y: number }; // Percentage in world map
  image: string;
  summary: string;
  strawHatActions: string[];
  majorAntagonists: string[];
  pivotalMoments: string[];
  logPoseTime?: string;
  notableLocations: string[];
  roadPoneglyph?: boolean;
}

export type DragonAura = 'azure' | 'crimson' | 'gold' | 'spectral' | 'shadow';
export type DragonSize = 'sleek' | 'large' | 'colossal';
