import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import anishService, { AnishBlocksProps, AnishItemsProps } from "../services/anish-service";
import minecraftDataService, { HarvestToolsProps, MinecraftItemsProps, MinecraftDataBlocksProps } from "../services/minecraft-data-service";
import { useQueries, useQuery } from "@tanstack/react-query";

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
const useBlocksAndItems = () =>{
    
    const [blocks, setBlocks] = useState<BlocksProps[]>([]);
    const [items, setItems] = useState<ItemsProps[]>([]);
    const [recipes, setRecipes] = useState<RecipeProps[]>([]); 
    const [toolsAndWeaponry, setToolsAndWeaponry] = useState<ItemsProps[]>()
    const [potions, setPotions] = useState<ItemsProps[]>()
    const [consumable, setConsumable] = useState<FoodProps[]>()
    const [plants, setPlants] = useState<ItemsProps[]>()
    const [valuables, setValuables] = useState<ItemsProps[]>()
    const [musicDiscs, setMusicDiscs] = useState<ItemsProps[]>()
    const [ingredients, setIngredients] = useState<ItemsProps[]>()
    const [error, setError] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
 
    const {data: anishItems, isLoading: anishItemsLoading, error: anishItemsError} = useQuery({
      queryKey: ['AllAnishItems'],
      queryFn: anishService.getAllItems
    })
    console.log(anishItems)

    const {data: MinecraftDataItems, isLoading: MinecraftDataItemsLoading, error: MinecraftDataItemsError} = useQuery({
      queryKey: ['AllMinecraftDataItems'],
      queryFn: minecraftDataService.getAllItems
    })
    console.log(MinecraftDataItems)

    const {data: anishBlocks, isLoading: anishBlocksLoading, error: anishBlocksError} = useQuery({
      queryKey: ['AllAnishBlocks'],
      queryFn: anishService.getAllBlocks
    })
    console.log(anishBlocks)

    const {data: MinecraftDataBlocks, isLoading: MinecraftDataBlocksLoading, error: MinecraftDataBlocksError} = useQuery({
      queryKey: ['AllMinecraftDataBlocks'],
      queryFn: minecraftDataService.getAllBlocks
    })
    console.log(MinecraftDataBlocks)
    
    const {data: anishRecipes, isLoading: anishRecipesLoading, error: anishRecipesError} = useQuery({
      queryKey: ['AllAnishRecipes'],
      queryFn: anishService.getAllRecipes
    })
    console.log(anishRecipes)

    const {data: MinecraftDataFoods, isLoading: MinecraftDataFoodsLoading, error: MinecraftDataFoodsError} = useQuery({
      queryKey: ['AllMinecraftDataFoods'],
      queryFn: minecraftDataService.getAllFoods
    })
    console.log(MinecraftDataFoods)


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
          if (minecraftDataItemsResponse && anishItemsResponse) {
            mergeItemData(minecraftDataItemsResponse, anishItemsResponse);
          }

          // Process blocks data
          if (anishBlocksResponse&& minecraftDataBlocksResponse) {
            mergeBlockData(anishBlocksResponse, minecraftDataBlocksResponse);
          }

          // Process recipes data
          if (anishRecipeResponse) {
            const correctedData = anishRecipeResponse.map(recipe => recipe.item === "Beacon" ? beacon : recipe);
            correctedData.push(noRecipe);
            setRecipes(correctedData);
          }

          //Process food data
          if (minecraftDataFoodResponse && anishItemsResponse){
            mergeFoodData(minecraftDataFoodResponse, anishItemsResponse as ItemsProps[])
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
      setToolsAndWeaponry((mergedItems as ItemsProps[]).filter(item => ["Chestplate", "Leggings", "Boots", "Helmet", "Sword", "Pickaxe", "Shovel", "Axe", "Hoe", "Shears", "Flint and Steel", "Bow", "Arrow", "Potion"].some(tool => item.name.includes(tool))));
      setPotions((mergedItems as ItemsProps[]).filter(item => ["Potion", "Arrow of"].some(tool => item.name.includes(tool))));
      setPlants((mergedItems as ItemsProps[]).filter(item => ["Oak Leaves", "Spruce Leaves", "Birch Leaves", "Jungle Leaves", "Acacia Leaves", "Dark Oak Leaves", "Azalea Leaves", "Flowering Azalea Leaves", "Mangrove Leaves", "Oak Sapling", "Sapling", "Birch Sapling", "Jungle Sapling", "Acacia Sapling", "Dark Oak Sapling", "Azalea", "Flowering Azalea", "Mangrove Propagule", "Allium", "Azure Bluet", "Blue Orchid", "Cornflower", "Dandelion", "Lilac", "Lily of the Valley", "Orange Tulip", "Oxeye Daisy", "Peony", "Pink Tulip", "Poppy", "Red Tulip", "Rose Bush", "Sunflower", "White Tulip", "Wither Rose", "Brown Mushroom", "Brown Mushroom Block", "Mushroom Stem", "Red Mushroom", "Red Mushroom Block", "Bamboo", "Cactus", "Carved Pumpkin", "Hay Bale", "Melon", "Pumpkin", "Sugar Cane", "Big Dripleaf", "Glow Lichen", "Hanging Roots", "Moss Block", "Moss Carpet", "Small Dripleaf", "Spore Blossom", "Dead Bush", "Fern", "Grass", "Large Fern", "Lily Pad", "Tall Grass", "Vines"].some(tool => item.name.includes(tool))));
      setValuables((mergedItems as ItemsProps[]).filter(item => ["Enchanted Golden Apple", "Dragon Egg", "Nether Star", "Diamond", "Ender Pearl", "Eye of Ender", "Emerald", "Totem of Undying", "Netherite Ingot", "Heart of the Sea", "Elytra", "Dragon's Breath", "Sea Lantern", "Head", "Nautilus Shell", "Netherite", "End Crystal", "Beacon", "Golden Apple"].some(tool => item.name.includes(tool))));
      setMusicDiscs((mergedItems as ItemsProps[]).filter(item => ["Music Disc", "Jukebox", "Note Block"].some(tool => item.name.includes(tool))));
      setIngredients((mergedItems as ItemsProps[]).filter(item => {return recipes?.find((recipe) => {return recipe.recipe.find((ingredient) => ingredient === item.name) !== undefined})}));
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
    setConsumable(mergedFood as FoodProps[]);
    }


    return {items, blocks, potions, recipes, isLoading, toolsAndWeaponry, consumable, plants, valuables, musicDiscs, error, ingredients, setItems, setBlocks, setRecipes, setIsLoading}
}

export default useBlocksAndItems;
