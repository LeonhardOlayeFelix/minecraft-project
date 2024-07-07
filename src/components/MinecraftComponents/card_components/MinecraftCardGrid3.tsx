import useMinecraftHook from "../../../hooks/useMinecraftHook";
import { ItemsProps } from "../../../interfaces/MinecraftInterfaces";
import "./MinecraftCardGird3.css";
import MinecraftItemCard from "./MinecraftItemCard";
import { Box, Flex } from "@chakra-ui/react";

interface Props {
  items: ItemsProps[];
  className?: string;
  handlePinToggle: (item: ItemsProps, isPinned: boolean) => void;
  handleCategoryChanged: (category: string) => void;
}

const MinecraftCardGrid3 = ({
  items,
  className,
  handlePinToggle,
  handleCategoryChanged,
}: Props) => {
  const data = useMinecraftHook();
  return (
    <Flex className={className}>
      <Box className={`container`}>
        {items.map((item, index) => (
          <div key={index} className="box">
            <MinecraftItemCard
              handlePinToggle={handlePinToggle}
              handleCategoryChanged={handleCategoryChanged}
              item={item}
              data={data}
            ></MinecraftItemCard>
          </div>
        ))}
      </Box>
    </Flex>
  );
};

export default MinecraftCardGrid3;
