import {
  FoodProps,
  MinecraftDataBlocksProps,
  MinecraftItemsProps,
} from "../interfaces/MinecraftInterfaces";
import pjsApiClient from "./pjs-api-client";

class MinecraftDataService {
  getAllBlocks() {
    return pjsApiClient
      .get<MinecraftDataBlocksProps[]>("/pc/1.20/blocks.json")
      .then((res) => res.data);
  }
  getAllItems() {
    return pjsApiClient
      .get<MinecraftItemsProps[]>("/pc/1.20/items.json")
      .then((res) => res.data);
  }
  getAllFoods() {
    return pjsApiClient
      .get<FoodProps[]>("/pc/1.20/foods.json")
      .then((res) => res.data);
  }
}

export default new MinecraftDataService();
