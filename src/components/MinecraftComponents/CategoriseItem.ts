import useBlocksAndItems, { BlocksProps, ItemsProps, RecipeProps } from "../../hooks/useMinecraftHook";

export interface UseBlocksAndItemsResult {
    items: ItemsProps[];
    isLoading: boolean
    toolsAndWeaponry: ItemsProps[] | undefined;
    blocks: BlocksProps[];
    potions: ItemsProps[] | undefined;
    consumable: ItemsProps[]| undefined;
    plants: ItemsProps[]| undefined;
    valuables: ItemsProps[]| undefined;
    musicDiscs: ItemsProps[]| undefined;
    recipes: RecipeProps[];
  }



const categoriseItems = (item:ItemsProps, data: UseBlocksAndItemsResult) => {
    
    const inWeaponsTools = data.toolsAndWeaponry?.find(
        (tool) => tool.name === item.name
      ) != undefined;
      const inBlocks = data.blocks?.find((block) => block.name === item.name) != undefined;

      const inPotions = data.potions?.find((potion) => potion.name === item.name) != undefined;
    
      const inConsumable = data.consumable?.find((munch) => munch.name === item.name) != undefined;
    
      const inPlants = data.plants?.find((plant) => plant.name === item.name) != undefined;
    
      const inValuables = data.valuables?.find(
        (valuable) => valuable.name === item.name
      ) != undefined;
    
      const inMusical = data.musicDiscs?.find((disc) => disc.name === item.name) != undefined;
    
      const inRecipes = data.recipes?.find((recipe) => recipe.item === item.name) != undefined;
    
      const inIngredients = data.recipes?.find((recipe) =>
        recipe.recipe.find((ingredient) => ingredient === item.name)
      ) != undefined;
    
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