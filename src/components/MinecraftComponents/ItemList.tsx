import React from "react";
import useBlocksAndItems from "../../hooks/useMinecraftHook";
import { ListItem, Text, UnorderedList } from "@chakra-ui/react";

const ItemList = () => {
  const { items, blocks, recipes, isLoading, error } = useBlocksAndItems();
  console.log(items);
  return (
    <>
      {error && (
        <Text color={"tomato"}>
          There was a problem when fetching the data. Please try again.
        </Text>
      )}
      <UnorderedList>
        {items.map((item, index) => (
          <ListItem key={index}>{item.name}</ListItem>
        ))}
      </UnorderedList>
    </>
  );
};

export default ItemList;
