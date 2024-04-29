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
    <SimpleGrid columns={{ lg: 4, md: 3, sm: 1 }} spacing={5}>
      {items.map((item) => (
        <MinecraftItemCard item={item} data={data}></MinecraftItemCard>
      ))}
    </SimpleGrid>
  );
};

export default MinecraftCardGrid2;
