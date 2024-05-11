import { BlocksProps, ItemsProps, MinecraftDataFoodProps, RecipeProps } from "../../hooks/useMinecraftHook";

export interface UseBlocksAndItemsResult {
    items: ItemsProps[];
    isLoading: boolean
    toolsAndWeaponry: ItemsProps[];
    blocks: BlocksProps[];
    potions: ItemsProps[];
    consumable: MinecraftDataFoodProps[];
    plants: ItemsProps[];
    valuables: ItemsProps[];
    musicDiscs: ItemsProps[];
    recipes: RecipeProps[];
    ingredients: ItemsProps[];
  }

export const categories =  [ "Any","Pinned","Weapons & Tools", "Blocks", "Potions", "Consumable", "Plants", "Valuables", "Musical", "Recipes", "Ingredients"]


/**
 * 
 * @param item items to compare against each category
 * @param data list of items 
 * @returns a set of a lists which are either undefined, or contain that item depending on whether its in that category
 */

const categoriseItems = (item:ItemsProps, data: UseBlocksAndItemsResult) => {
    
    const inWeaponsTools = data.toolsAndWeaponry?.find(
        (tool) => tool.name === item.name
      );
      const inBlocks = data.blocks?.find((block) => block.name === item.name);

      const inPotions = data.potions?.find((potion) => potion.name === item.name);
    
      const inConsumable = data.consumable?.find((munch) => munch.name === item.name);
    
      const inPlants = data.plants?.find((plant) => plant.name === item.name);
    
      const inValuables = data.valuables?.find(
        (valuable) => valuable.name === item.name
      );
    
      const inMusical = data.musicDiscs?.find((disc) => disc.name === item.name);
    
      const inRecipes = data.recipes?.find((recipe) => recipe.item === item.name);
    
      const inIngredients = data.recipes?.find((recipe) =>
        recipe.recipe.find((ingredient) => ingredient === item.name)
      );
    
      const inIngredientsOrRecipes = inRecipes || inIngredients;
    
      const inCategoryExcludingRecipesAndIngredients =
        inWeaponsTools ||
        inBlocks ||
        inPotions ||
        inConsumable ||
        inPlants ||
        inValuables ||
        inMusical;
    
      const inCategory =
        inCategoryExcludingRecipesAndIngredients || inRecipes || inIngredients;

    return {inWeaponsTools, inBlocks, inPotions, inConsumable, inPlants, inValuables, inMusical, inRecipes, inIngredients, inIngredientsOrRecipes, inCategoryExcludingRecipesAndIngredients, inCategory}
}



export default categoriseItems;