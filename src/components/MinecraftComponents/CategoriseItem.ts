import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";

const {
    items,
    toolsAndWeaponry,
    isLoading,
    blocks,
    potions,
    consumable,
    plants,
    valuables,
    musicDiscs,
    recipes,
  } = useBlocksAndItems();


const categoriseItems = (item:ItemsProps) => {
    const inWeaponsTools = toolsAndWeaponry?.find(
        (tool) => tool.name === item.name
      );
      const inBlocks = blocks?.find((block) => block.name === item.name) != undefined;

      const inPotions = potions?.find((potion) => potion.name === item.name) != undefined;
    
      const inConsumable = consumable?.find((munch) => munch.name === item.name) != undefined;
    
      const inPlants = plants?.find((plant) => plant.name === item.name) != undefined;
    
      const inValuables = valuables?.find(
        (valuable) => valuable.name === item.name
      ) != undefined;
    
      const inMusical = musicDiscs?.find((disc) => disc.name === item.name) != undefined;
    
      const inRecipes = recipes?.find((recipe) => recipe.item === item.name) != undefined;
    
      const inIngredients = recipes?.find((recipe) =>
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

    return {inWeaponsTools, inPotions, inConsumable, inPlants, inValuables, inMusical, inRecipes, inIngredients, inIngredientsOrRecipes, inCategoryExcludingRecipesAndIngredients, inCategory}
}

export default categoriseItems 