import React from "react";
import {
  ItemsProps,
  UseBlocksAndItemsResult,
} from "../../../interfaces/MinecraftInterfaces";
import "./MinecraftCardGrid.css";
import { Box } from "@chakra-ui/react";
import MinecraftItemCard from "./MinecraftItemCard";
interface Props {
  items: ItemsProps[];
  handlePinToggle: (item: ItemsProps, isPinned: boolean) => void;
  handleCategoryChanged: (category: string) => void;
  data: UseBlocksAndItemsResult;
}

const MinecraftCardGrid = ({
  items,
  handlePinToggle,
  handleCategoryChanged,
  data,
}: Props) => {
  return (
    <Box className={`container`}>
      {items.map((item, index) => (
        <div key={index} className="box">
          <MinecraftItemCard
            handleCategoryChanged={handleCategoryChanged}
            handlePinToggle={handlePinToggle}
            item={item}
            data={data}
          ></MinecraftItemCard>
        </div>
      ))}
    </Box>
  );
};

export default MinecraftCardGrid;
