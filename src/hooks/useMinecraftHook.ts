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
    const [isLoading, setIsLoading] = useState(false);
    const [blocks, setBlocks] = useState<BlocksProps[]>([]);
    const [items, setItems] = useState<ItemsProps[]>([]);
    const [recipes, setRecipes] = useState<RecipeProps[]>([]);
    const [error, setError] = useState(false);

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
        setIsLoading(true);
  
        try {
          // Get Anish Items
          const anishItemsResponse = await anishService.getAllItems();
  
          // Get PrismarineJS Items
          const minecraftDataItemsResponse =
            await minecraftDataService.getAllItems();
          if (minecraftDataItemsResponse.data && anishItemsResponse.data) {
            
            mergeItemData(
              minecraftDataItemsResponse.data,
              anishItemsResponse.data
            );
          } else {
            controller.abort();
          }
        } catch (err) {
          if (err instanceof CanceledError) return; // If the operation was cancelled, no need to handle the error
          console.error(err);
          setError(true)
        } finally {
          setIsLoading(false);
        }
  
        try {
          // Get Anish Blocks
          setIsLoading(true);
          const anishBlocksResponse = await anishService.getAllBlocks();
  
          // Get PrismarineJS Blocks
          const minecraftDataBlocksResponse =
            await minecraftDataService.getAllBlocks();
  
          if (anishBlocksResponse.data && minecraftDataBlocksResponse.data) {
            mergeBlockData(
              anishBlocksResponse.data,
              minecraftDataBlocksResponse.data
            );
          } else {
            controller.abort();
          }
        } catch (err) {
          if (err instanceof CanceledError) return; // If the operation was cancelled, no need to handle the error
          console.error(err);
          setError(true)
        } finally {
          setIsLoading(false);
        }

        try {
          // Get Anish Recipes
          setIsLoading(true);
          const anishRecipeResponse = await anishService.getAllRecipes();
          if (anishRecipeResponse.data){
            //There is erroneous data in this json file, I found one and fix it here.
            const correctedData = anishRecipeResponse.data.map((recipe) => {
              if (recipe.item === "Beacon"){
                return beacon
              }
              return recipe
            })
            //Also need to add the empty recipe to the data
            correctedData.push(noRecipe)
            setRecipes(correctedData)
          }
          else {
            controller.abort();
          }
        } catch (err) {
          if (err instanceof CanceledError) return; // If the operation was cancelled, no need to handle the error
          console.error(err);
          setError(true)
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
  
      return () => {
        controller.abort(); // Clean up by aborting any ongoing requests when the component unmounts
      };
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

    return {items, blocks, recipes, isLoading, error, setItems, setBlocks, setRecipes, setIsLoading}
}

export default useBlocksAndItems;
