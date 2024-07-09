import {
  ItemsProps,
  UseBlocksAndItemsResult,
} from "../../../interfaces/MinecraftInterfaces";
import "./MinecraftCardGird3.css";
import MinecraftItemCard from "./MinecraftItemCard";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  items: ItemsProps[];
  handlePinToggle: (item: ItemsProps, isPinned: boolean) => void;
  handleCategoryChanged: (category: string) => void;
  handleIconClicked: (iconName: string) => void;
  handleResultClicked?: (resultName: string) => void;
  handleMaterialClicked?: (materialName: string) => void;
  data: UseBlocksAndItemsResult;
}
const MinecraftCardGrid3 = ({
  items,
  handlePinToggle,
  handleCategoryChanged,
  data,
  handleIconClicked,
  handleResultClicked,
  handleMaterialClicked,
}: Props) => {
  return (
    <Flex className={"container"} justifyContent={"center"}>
      <Flex
        justifyContent={"center"}
        wrap={"wrap"}
        direction={"row"} // Change direction to row
        gap={"15px"}
      >
        {items.map((item, index) => (
          <div key={index} className="box">
            <MinecraftItemCard
              handleMaterialClicked={handleMaterialClicked}
              handleResultClicked={handleResultClicked}
              handlePinToggle={handlePinToggle}
              handleCategoryChanged={handleCategoryChanged}
              handleIconClicked={handleIconClicked}
              item={item}
              data={data}
            />
          </div>
        ))}
      </Flex>
    </Flex>
  );
};

export default MinecraftCardGrid3;
