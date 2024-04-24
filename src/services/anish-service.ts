import { RecipeProps } from "../hooks/useMinecraftHook";
import ansApiClient from "./ans-api-client";

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

class AnishService{
    getAllBlocks() {
        return ansApiClient.get<AnishBlocksProps[]>( "/blocks");
    }
    getAllItems() {
        return ansApiClient.get<AnishItemsProps[]>("/items");
    }
    getAllRecipes(){
        return ansApiClient.get<RecipeProps[]>("/crafting-recipes");
    }
}

export default new AnishService();