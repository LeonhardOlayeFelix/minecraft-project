import { MinecraftDataFoodProps } from "../hooks/useMinecraftHook";
import pjsApiClient from "./pjs-api-client";

export interface MinecraftDataBlocksProps {
    id: number;
    name: string;
    displayName: string;
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
    states: [];
    harvestTools: HarvestToolsProps;
    drops: number[];
    boundingBox: string;
  }
  
  export interface MinecraftItemsProps {
    id: 0;
    name: "air";
    displayName: "Air";
    stackSize: 64;
  }
  export interface HarvestToolsProps {
    [key: string]: boolean;
  }

class MinecraftDataService{
    getAllBlocks(){
        return pjsApiClient.get<MinecraftDataBlocksProps[]>("/pc/1.20/blocks.json");
    }
    getAllItems(){
        return pjsApiClient.get<MinecraftItemsProps[]>("/pc/1.20/items.json");
    }
    getAllFoods(){
      return pjsApiClient.get<MinecraftDataFoodProps[]>("/pc/1.20/foods.json");
    }
}

export default new MinecraftDataService