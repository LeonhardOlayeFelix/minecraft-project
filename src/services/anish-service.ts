import ansApiClient from "./ans-api-client";
import {
  AnishBlocksProps,
  AnishItemsProps,
  RecipeProps,
} from "../interfaces/MinecraftInterfaces";

class AnishService {
  getAllBlocks() {
    return ansApiClient
      .get<AnishBlocksProps[]>("/blocks")
      .then((res) => res.data);
  }
  getAllItems() {
    return ansApiClient
      .get<AnishItemsProps[]>("/items")
      .then((res) => res.data);
  }
  getAllRecipes() {
    return ansApiClient
      .get<RecipeProps[]>("/crafting-recipes")
      .then((res) => res.data);
  }
}

export default new AnishService();
