import { ItemsProps } from "../../hooks/useMinecraftHook";
import { UseBlocksAndItemsResult } from "./CategoriseItem";


/**
 * 
 * @param category Category to filter the data ["Any","Weapons & Tools", "Blocks", "Potions", "Consumable", "Plants", "Valuables", "Musical", "Recipes", "Ingredients"]
 * @param data List of items to filter
 * @returns list of items which are in that
 */

const getItemsInCategory = (category: string, data: UseBlocksAndItemsResult) => {
    let filteredData = data.items

    if (category === "Any") {
        filteredData = data.items;
    } 
    else if (category === "Blocks") {
    filteredData = data.items.filter((item) => 
        data.blocks.find((block) => block.name == item.name) != undefined)
    }
    else if(category === "Weapons & Tools"){
      filteredData = data.items.filter((item) => 
        data.toolsAndWeaponry?.find((weapon) => weapon.name == item.name) !== undefined)
    }
    else if(category === "Potions"){
        filteredData = data.items.filter((item) => 
          data.potions?.find((potion) => potion.name == item.name) !== undefined)
    }
    else if(category === "Consumable"){
    filteredData = data.items.filter((item) => 
        data.consumable?.find((consumable) => consumable.name == item.name) !== undefined)
    }
    else if(category === "Plants"){
        filteredData = data.items.filter((item) => 
            data.plants?.find((plant) => plant.name == item.name) !== undefined)
    }
    else if(category === "Valuables"){
        filteredData = data.items.filter((item) => 
            data.valuables?.find((valuable) => valuable.name == item.name) !== undefined)
    }
    else if(category === "Musical"){
        filteredData = data.items.filter((item) => 
            data.musicDiscs?.find((music) => music.name == item.name) !== undefined)
    }
    else if(category === "Recipes"){
        filteredData = data.items.filter((item) => 
            data.recipes?.find((recipe) => recipe.item == item.name) !== undefined)
    }
    else if(category === "Ingredients"){
        console.log("hi")
        filteredData = data.items.filter((item) => 
            data.ingredients?.find((recipe) => recipe.name == item.name) !== undefined)
    }
    return filteredData
}

export default getItemsInCategory