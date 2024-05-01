import { useEffect } from "react";
import useMinecraftHook, { ItemsProps } from "../../../hooks/useMinecraftHook";
import "./MinecraftCardGird3.css";
import MinecraftItemCard from "./MinecraftItemCard";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  items: ItemsProps[];
  className?: string;
}

const MinecraftCardGrid3 = ({ items, className }: Props) => {
  const data = useMinecraftHook();
  return (
    <Flex className={className}>
      <Box className={`container`}>
        {items.map((item, index) => (
          <div key={index} className="box">
            <MinecraftItemCard item={item} data={data}></MinecraftItemCard>
          </div>
        ))}
      </Box>
    </Flex>
  );
};

export default MinecraftCardGrid3;
