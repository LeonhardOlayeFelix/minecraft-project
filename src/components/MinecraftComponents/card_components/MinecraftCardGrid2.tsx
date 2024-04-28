import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import useMinecraftHook, { ItemsProps } from "../../../hooks/useMinecraftHook";
import MinecraftItemCard from "./MinecraftItemCard";

interface Props {
  items: ItemsProps[];
  className?: string;
}

const MinecraftCardGrid2 = ({ items, className }: Props) => {
  const data = useMinecraftHook();
  return (
    <SimpleGrid columns={4} spacing={10}>
      {items.map((item) => (
        <MinecraftItemCard item={item} data={data}></MinecraftItemCard>
      ))}
    </SimpleGrid>
  );
};

export default MinecraftCardGrid2;
