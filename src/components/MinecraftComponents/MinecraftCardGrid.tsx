import { Box, Container, Flex, Show, SimpleGrid } from "@chakra-ui/react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import MinecraftItemCard from "./MinecraftItemCard";
import Masonry from "react-masonry-css";
import "./MinecraftGrid.css";
interface Props {
  items: ItemsProps[];
  className?: string;
}
//width={{ xl: "1300px", lg: "1000px", md: "700px", sm: "400px" }}
const MinecraftCardGrid = ({ items, className }: Props) => {
  const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    950: 2,
    600: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={"my-masonry-grid " + className}
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => (
        <div>
          <MinecraftItemCard data={useBlocksAndItems()} item={item} />
        </div>
      ))}
    </Masonry>
  );
};

export default MinecraftCardGrid;
