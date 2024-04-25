import { Box, Container, Flex, Show, SimpleGrid } from "@chakra-ui/react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import MinecraftCardv2 from "./MinecraftCardv2";
import Masonry from "react-masonry-css";
import "./MinecraftGrid.css";
interface Props {
  items: ItemsProps[];
  className?: string;
}
//width={{ xl: "1300px", lg: "1000px", md: "700px", sm: "400px" }}
const MinecraftGrid = ({ items, className }: Props) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item) => (
        <div>
          <MinecraftCardv2 item={item} />
        </div>
      ))}
    </Masonry>
  );
};

export default MinecraftGrid;
