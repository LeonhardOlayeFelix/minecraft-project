import { ItemsProps } from "../../interfaces/MinecraftInterfaces";
import SimilarSearchesString from "./SimilarSearchesString";

const SimilarSearchesItems = (items: ItemsProps[], item: ItemsProps) => {
  const itemsAsString = items.map((item) => item.name);
  const itemAsString = item.name;
  const similarSearches = SimilarSearchesString(
    itemsAsString,
    itemAsString,
    0.5
  );
  const itemsToReturn = similarSearches.map((result) =>
    items.find((itemfound) => itemfound.name === result)
  );
  return itemsToReturn;
};

export default SimilarSearchesItems;
