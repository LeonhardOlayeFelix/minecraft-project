export interface MinecraftDataBlocksProps {
  id: number;
  name: string;
  displayName: string;
  hardness: number;
  resistance: number;
  stackSize: number;
  diggable: boolean;
  material: string;
  transparent: boolean;
  emitLight: number;
  filterLight: number;
  defaultState: number;
  minStateId: number;
  maxStateId: number;
  states: [];
  harvestTools: HarvestToolsProps;
  drops: number[];
  boundingBox: string;
}

export interface MinecraftItemsProps {
  id: 0;
  name: "air";
  displayName: "Air";
  stackSize: 64;
}
export interface HarvestToolsProps {
  [key: string]: boolean;
}
export interface Colors {
  color: number[];
  amount: number;
}

export interface AnishItemsProps {
  name: string;
  namespacedId: string;
  description: string;
  image: string;
  stackSize: number;
  renewable: boolean;
}

//Blocks is a subset of items but just with more data for each object.
export interface AnishBlocksProps {
  name: string;
  namespacedId: string;
  description: string;
  image: string;
  item: string;
  tool: string;
  flammable: boolean;
  transparent: boolean;
  luminance: number;
  blastResistance: number;
  colors: Colors[];
}

export interface UseBlocksAndItemsResult {
  items: ItemsProps[];
  blocks: BlocksProps[];
  recipes: RecipeProps[];
  consumable: FoodProps[];

  toolsAndWeaponry: ItemsProps[];
  potions: ItemsProps[];
  plants: ItemsProps[];
  valuables: ItemsProps[];
  musicDiscs: ItemsProps[];
  ingredients: ItemsProps[];

  isLoading: boolean;
}

export interface BlocksProps extends AnishBlocksProps {
  id: number;
  hardness: number;
  resistance: number;
  stackSize: number;
  diggable: boolean;
  material: string;
  transparent: boolean;
  emitLight: number;
  filterLight: number;
  defaultState: number;
  minStateId: number;
  maxStateId: number;
  states: any[];
  harvestTools: HarvestToolsProps;
  drops: number[];
  boundingBox: string;
}
export interface FoodProps extends ItemsProps {
  id: number;
  name: string;
  stackSize: number;
  displayName: string;
  foodPoints: number;
  saturation: number;
  effectiveQuality: number;
  saturationRatio: number;
}

export interface ItemsProps extends AnishItemsProps {
  id: number;
}

export interface RecipeProps {
  item: string;
  quantity: number;
  recipe: (string | string[] | null)[];
  shapeless: boolean;
}
export interface Colors {
  color: number[];
  amount: number;
}

export interface AnishItemsProps {
  name: string;
  namespacedId: string;
  description: string;
  image: string;
  stackSize: number;
  renewable: boolean;
}

export interface AnishBlocksProps {
  name: string;
  namespacedId: string;
  description: string;
  image: string;
  item: string;
  tool: string;
  flammable: boolean;
  transparent: boolean;
  luminance: number;
  blastResistance: number;
  colors: Colors[];
}
