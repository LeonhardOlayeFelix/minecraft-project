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
interface FoodProps extends ItemsProps{
  id: number;
    name: string;
    stackSize: number;
    displayName: string;
    foodPoints: number;
    saturation: number;
    effectiveQuality: number;
    saturationRatio: number;
}
  
export interface MinecraftDataFoodProps{
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
const useBlocksAndItems = () =>{
    
    const [blocks, setBlocks] = useState<BlocksProps[]>([]);
    const [items, setItems] = useState<ItemsProps[]>([]);
    const [recipes, setRecipes] = useState<RecipeProps[]>([]); 
    const [toolsAndWeaponry, setToolsAndWeaponry] = useState<ItemsProps[]>()
    const [potions, setPotions] = useState<ItemsProps[]>()
    const [food, setFood] = useState<FoodProps[]>()
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

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
      const [anishItemsResponse, minecraftDataItemsResponse, anishBlocksResponse, minecraftDataBlocksResponse, anishRecipeResponse, minecraftDataFoodResponse] = await Promise.all([
        anishService.getAllItems(),
        minecraftDataService.getAllItems(),
        anishService.getAllBlocks(),
        minecraftDataService.getAllBlocks(),
        anishService.getAllRecipes(),
        minecraftDataService.getAllFoods()
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

      //Process food data
      if (minecraftDataFoodResponse.data && anishItemsResponse.data){
        console.log(minecraftDataFoodResponse.data)
        mergeFoodData(minecraftDataFoodResponse.data, anishItemsResponse.data as ItemsProps[])
      }
      // Set tools and weaponry based on item names
      
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
      setToolsAndWeaponry((mergedItems as ItemsProps[]).filter(item => ["Sword", "Pickaxe", "Shovel", "Axe", "Hoe", "Shears", "Flint and Steel", "Bow", "Arrow", "Potion"].some(tool => item.name.includes(tool))));
      setPotions((mergedItems as ItemsProps[]).filter(item => ["Potion", "Arrow of"].some(tool => item.name.includes(tool))));
      //setFood((mergedItems as ItemsProps[]).filter(item => ["Apple", "Baked Potato", "Beetroot", "Beetroot Soup", "Bread", "Cake", "Carrot", "Chorus Fruit", "Cooked Chicken", "Cooked Cod", "Cooked Mutton", "Cooked Porkchop", "Cooked Rabbit", "Cooked Salmon", "Cookie", "Dried Kelp", "Enchanted Golden Apple", "Golden Apple", "Glow Berries", "Golden Carrot", "Honey Bottle", "Melon Slice", "Mushroom Stew", "Poisonous Potato", "Potato", "Pufferfish", "Pumpkin Pie", "Rabbit Stew", "Raw Beef", "Raw Chicken", "Raw Cod", "Raw Mutton", "Raw Porkchop", "Raw Rabbit", "Raw Salmon", "Rotten Flesh", "Spider Eye", "Steak", "Suspicous Stew", "Sweet Berries", "Tropical Fish" ].some(tool => item.name.includes(tool))));
      //console.log((mergedItems as ItemsProps[]).filter(item => ["Apple", "Baked Potato", "Beetroot", "Beetroot Soup", "Bread", "Cake", "Carrot", "Chorus Fruit", "Cooked Chicken", "Cooked Cod", "Cooked Mutton", "Cooked Porkchop", "Cooked Rabbit", "Cooked Salmon", "Cookie", "Dried Kelp", "Enchanted Golden Apple", "Golden Apple", "Glow Berries", "Golden Carrot", "Honey Bottle", "Melon Slice", "Mushroom Stew", "Poisonous Potato", "Potato", "Pufferfish", "Pumpkin Pie", "Rabbit Stew", "Raw Beef", "Raw Chicken", "Raw Cod", "Raw Mutton", "Raw Porkchop", "Raw Rabbit", "Raw Salmon", "Rotten Flesh", "Spider Eye", "Steak", "Suspicous Stew", "Sweet Berries", "Tropical Fish" ].some(tool => item.name.includes(tool))))
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

    const mergeFoodData = (
      //merging matching food objects together
      minecraftFood:MinecraftDataFoodProps[],
      anishFoods: ItemsProps[]
    ) => {
      const mergedFood = anishFoods
      .map((anishFood) => {
        const matchingBlock = minecraftFood.find(
          (mFood) => mFood.displayName === anishFood.name
        );
        if (matchingBlock) {
          return {
            ...matchingBlock,
            ...anishFood,
          };
        }
        return null;
      })
      .filter((block) => block !== null); // Ensure only matched blocks are included
    setFood(mergedFood as FoodProps[]);
    console.log(mergedFood)
    }


    return {items, blocks, potions, recipes, isLoading, toolsAndWeaponry, food, error, setItems, setBlocks, setRecipes, setIsLoading}
}

export default useBlocksAndItems;
