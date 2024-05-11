import { useQuery } from "@tanstack/react-query";
import { AnishBlocksProps, AnishItemsProps, BlocksProps, FoodProps, ItemsProps, MinecraftDataBlocksProps, MinecraftItemsProps } from "../interfaces/MinecraftInterfaces";
import anishService from "../services/anish-service";
import minecraftDataService from "../services/minecraft-data-service";
import { beacon, noRecipe } from "../interfaces/Instances";


  
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
  return mergedItems;
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
  return mergedBlocks;
};

const mergeFoodData = (
  //merging matching food objects together
  minecraftFood:FoodProps[],
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
return mergedFood;
}
const useBlocksAndItems = () =>{
 
    const {data: anishItems, isLoading: anishItemsLoading, error: anishItemsError} = useQuery({
      queryKey: ['AllAnishItems'],
      queryFn: anishService.getAllItems
    });

    const {data: MinecraftDataItems, isLoading: MinecraftDataItemsLoading, error: MinecraftDataItemsError} = useQuery({
      queryKey: ['AllMinecraftDataItems'],
      queryFn: minecraftDataService.getAllItems
    });

    const {data: anishBlocks, isLoading: anishBlocksLoading, error: anishBlocksError} = useQuery({
      queryKey: ['AllAnishBlocks'],
      queryFn: anishService.getAllBlocks
    });

    const {data: MinecraftDataBlocks, isLoading: MinecraftDataBlocksLoading, error: MinecraftDataBlocksError} = useQuery({
      queryKey: ['AllMinecraftDataBlocks'],
      queryFn: minecraftDataService.getAllBlocks
    });
    
    const {data: anishRecipes, isLoading: anishRecipesLoading, error: anishRecipesError} = useQuery({
      queryKey: ['AllAnishRecipes'],
      queryFn: anishService.getAllRecipes
    });

    const {data: MinecraftDataFoods, isLoading: MinecraftDataFoodsLoading, error: MinecraftDataFoodsError} = useQuery({
      queryKey: ['AllMinecraftDataFoods'],
      queryFn: minecraftDataService.getAllFoods
    });

    const items = MinecraftDataItems && anishItems ? mergeItemData(MinecraftDataItems, anishItems) as ItemsProps[] : [];
    const blocks = anishBlocks && MinecraftDataBlocks ? mergeBlockData(anishBlocks, MinecraftDataBlocks) as BlocksProps[]: [];
    const recipes = anishRecipes ? [...anishRecipes.map(recipe => recipe.item === "Beacon" ? beacon : recipe), noRecipe] : [];
    const consumable = MinecraftDataFoods && anishItems ? mergeFoodData(MinecraftDataFoods, anishItems as ItemsProps[]) as FoodProps[] : [];

    const toolsAndWeaponry = items.filter(item => ["Chestplate", "Leggings", "Boots", "Helmet", "Sword", "Pickaxe", "Shovel", "Axe", "Hoe", "Shears", "Flint and Steel", "Bow", "Arrow", "Potion"].some(tool => item.name.includes(tool)));
    const potions = items.filter(item => ["Potion", "Arrow of"].some(tool => item.name.includes(tool)));
    const plants = items.filter(item => ["Oak Leaves", "Spruce Leaves", "Birch Leaves", "Jungle Leaves", "Acacia Leaves", "Dark Oak Leaves", "Azalea Leaves", "Flowering Azalea Leaves", "Mangrove Leaves", "Oak Sapling", "Sapling", "Birch Sapling", "Jungle Sapling", "Acacia Sapling", "Dark Oak Sapling", "Azalea", "Flowering Azalea", "Mangrove Propagule", "Allium", "Azure Bluet", "Blue Orchid", "Cornflower", "Dandelion", "Lilac", "Lily of the Valley", "Orange Tulip", "Oxeye Daisy", "Peony", "Pink Tulip", "Poppy", "Red Tulip", "Rose Bush", "Sunflower", "White Tulip", "Wither Rose", "Brown Mushroom", "Brown Mushroom Block", "Mushroom Stem", "Red Mushroom", "Red Mushroom Block", "Bamboo", "Cactus", "Carved Pumpkin", "Hay Bale", "Melon", "Pumpkin", "Sugar Cane", "Big Dripleaf", "Glow Lichen", "Hanging Roots", "Moss Block", "Moss Carpet", "Small Dripleaf", "Spore Blossom", "Dead Bush", "Fern", "Grass", "Large Fern", "Lily Pad", "Tall Grass", "Vines"].some(tool => item.name.includes(tool)));
    const valuables = items.filter(item => ["Enchanted Golden Apple", "Dragon Egg", "Nether Star", "Diamond", "Ender Pearl", "Eye of Ender", "Emerald", "Totem of Undying", "Netherite Ingot", "Heart of the Sea", "Elytra", "Dragon's Breath", "Sea Lantern", "Head", "Nautilus Shell", "Netherite", "End Crystal", "Beacon", "Golden Apple"].some(tool => item.name.includes(tool)));
    const musicDiscs = items.filter(item => ["Music Disc", "Jukebox", "Note Block"].some(tool => item.name.includes(tool)));
    const ingredients = items.filter(item => recipes?.find((recipe) => recipe.recipe.find((ingredient) => ingredient === item.name) !== undefined));

    const isLoading = anishItemsLoading || MinecraftDataItemsLoading || anishBlocksLoading || MinecraftDataBlocksLoading || anishRecipesLoading || MinecraftDataFoodsLoading;
    const error = anishItemsError || MinecraftDataItemsError || anishBlocksError || MinecraftDataBlocksError || anishRecipesError || MinecraftDataFoodsError;
    return {items, blocks, potions, recipes, isLoading, toolsAndWeaponry, consumable, plants, valuables, musicDiscs, ingredients, error};
}

export default useBlocksAndItems;
