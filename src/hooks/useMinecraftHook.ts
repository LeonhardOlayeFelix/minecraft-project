import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import anishService, { AnishBlocksProps, AnishItemsProps } from "../services/anish-service";
import minecraftDataService, { HarvestToolsProps, MinecraftItemsProps, MinecraftDataBlocksProps } from "../services/minecraft-data-service";

interface BlocksProps extends AnishBlocksProps {
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
  
  export interface ItemsProps extends AnishItemsProps {
    id: number;
  }

  export interface RecipeProps {
    item: string;
    quantity: number;
    recipe: (string | string[] | null)[];
    shapeless: boolean;
  }
const useBlocksAndItems = () =>{
    
    const [blocks, setBlocks] = useState<BlocksProps[]>([]);
    const [items, setItems] = useState<ItemsProps[]>([]);
    const [recipes, setRecipes] = useState<RecipeProps[]>([]); 
    const [toolsAndWeaponry, setToolsAndWeaponry] = useState<ItemsProps[]>()
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [blocksIsLoading, setBlocksIsLoading] = useState(false)
    const [itemsIsLoading, setItemsIsLoading] = useState(false)
    const [recipesIsLoading, setRecipesIsLoading] = useState(false)
    const [toolsAndWeaponryIsLoading, setToolsAndWeaponryIsLoading] = useState(false)

const beacon =  {
  item: "Beacon",
  quantity: 1,
  recipe: [
    "Glass",
    "Glass",
    "Glass",
    "Glass",
    "Nether Star",
    "Glass",
    "Obsidian",
    "Obsidian",
    "Obsidian"
  ],
  shapeless: false
}
const noRecipe =  {
  item: "Empty",
  quantity: 1,
  recipe: [
    "Air",
    "Air",
    "Air",
    "Air",
    "Air",
    "Air",
    "Air",
    "Air",
    "Air"
  ],
  shapeless: false
}

useEffect(() => {
  const controller = new AbortController();
  const fetchData = async () => {
    setIsLoading(true); // Start loading before any data fetching begins

    try {
      const [anishItemsResponse, minecraftDataItemsResponse, anishBlocksResponse, minecraftDataBlocksResponse, anishRecipeResponse] = await Promise.all([
        anishService.getAllItems(),
        minecraftDataService.getAllItems(),
        anishService.getAllBlocks(),
        minecraftDataService.getAllBlocks(),
        anishService.getAllRecipes()
      ]);

      // Process items data
      if (minecraftDataItemsResponse.data && anishItemsResponse.data) {
        mergeItemData(minecraftDataItemsResponse.data, anishItemsResponse.data);
      }

      // Process blocks data
      if (anishBlocksResponse.data && minecraftDataBlocksResponse.data) {
        mergeBlockData(anishBlocksResponse.data, minecraftDataBlocksResponse.data);
      }

      // Process recipes data
      if (anishRecipeResponse.data) {
        const correctedData = anishRecipeResponse.data.map(recipe => recipe.item === "Beacon" ? beacon : recipe);
        correctedData.push(noRecipe);
        setRecipes(correctedData);
      }

      // Set tools and weaponry based on item names
      setToolsAndWeaponry(items.filter(item => ["Sword", "Pickaxe", "Shovel", "Axe", "Hoe", "Shears", "Flint and Steel"].some(tool => item.name.includes(tool))));

    } catch (err) {
      if (err instanceof CanceledError) return;
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false); // End loading after all data fetching is complete or failed
    }
  };

  fetchData();

  return () => controller.abort(); // Clean up on component unmount
}, []);
  
    const mergeItemData = (
      //merges matching objects from anishBlocks and Minecraft-data. Some data is lost
      minecraftItems: MinecraftItemsProps[],
      anishItems: AnishItemsProps[]
    ) => {
      const mergedItems = anishItems.map((anishItem) => {
        const matchingItem = minecraftItems.find(
          (mItem) => mItem.displayName === anishItem.name
        );
        if (matchingItem) {
          return {
            ...anishItem,
            id: matchingItem.id,
          };
        }
        return anishItem;
      });
      setItems((mergedItems as ItemsProps[]));
    };
  
    const mergeBlockData = (
      //merges matching objects from anishBlocks and Minecraft-data. Some data is lost, where matches werent found (33 objects to be precise)
      anishBlocks: AnishBlocksProps[],
      minecraftBlocks: MinecraftDataBlocksProps[]
    ) => {
      const mergedBlocks = anishBlocks
        .map((anishBlock) => {
          const matchingBlock = minecraftBlocks.find(
            (mBlock) => mBlock.displayName === anishBlock.name
          );
          if (matchingBlock) {
            return {
              ...matchingBlock,
              ...anishBlock,
            };
          }
          return null;
        })
        .filter((block) => block !== null); // Ensure only matched blocks are included
      setBlocks(mergedBlocks as BlocksProps[]);
    };



    return {items, blocks, recipes, isLoading, toolsAndWeaponry, error, setItems, setBlocks, setRecipes, setIsLoading}
}

export default useBlocksAndItems;
