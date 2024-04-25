import { Box, Show, SimpleGrid } from "@chakra-ui/react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import MinecraftCardv2 from "./MinecraftCardv2";
interface Props {
  items: ItemsProps[];
  className?: string;
}
//width={{ xl: "1300px", lg: "1000px", md: "700px", sm: "400px" }}
const MinecraftSearchGrid = ({ items, className }: Props) => {
  return (
    <div className={className}>
      <Show above="sm">
        <SimpleGrid
          padding={10}
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          width={{ xl: "1300px", lg: "1000px", md: "700px", sm: "400px" }}
        >
          {items.map((fff, index) => (
            <Box className="mb-3" display={"flex"} justifyContent={"center"}>
              <MinecraftCardv2 key={index} item={fff} />
            </Box>
          ))}
        </SimpleGrid>
      </Show>
    </div>
  );
};

export default MinecraftSearchGrid;
