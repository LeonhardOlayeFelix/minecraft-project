import { Box, Flex, Show, SimpleGrid } from "@chakra-ui/react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import MinecraftCardv2 from "./MinecraftCardv2";
interface Props {
  items: ItemsProps[];
  className?: string;
}
//width={{ xl: "1300px", lg: "1000px", md: "700px", sm: "400px" }}
const MinecraftGrid = ({ items, className }: Props) => {
  return (
    <div className={className}>
      <Show above="1300px">
        <Flex justifyContent={"space-between"} gap={4}>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 4 === 0 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 4 === 1 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 4 === 2 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 4 === 3 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
        </Flex>
      </Show>
      <Show above="1000px">
        <Flex justifyContent={"space-between"} gap={4}>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 3 === 0 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 3 === 1 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 3 === 2 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
        </Flex>
      </Show>
      <Show above="700px">
        <Flex justifyContent={"space-between"} gap={4}>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 2 === 0 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
          <SimpleGrid columns={1}>
            {items.map(
              (fff, index) =>
                index % 2 === 1 && (
                  <Box
                    className="mb-3"
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <MinecraftCardv2 key={index} item={fff} />
                  </Box>
                )
            )}
          </SimpleGrid>
        </Flex>
      </Show>
      <Show above="400px">
        <Flex justifyContent={"space-between"} gap={4}>
          <SimpleGrid columns={1}>
            {items.map((fff, index) => (
              <Box className="mb-3" display={"flex"} justifyContent={"center"}>
                <MinecraftCardv2 key={index} item={fff} />
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </Show>
    </div>
  );
};

export default MinecraftGrid;
