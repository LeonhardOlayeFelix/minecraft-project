import { Box, Flex, Show, Text } from "@chakra-ui/react";
import CraftingRecipeComponent from "./CraftingRecipeComponent";
import { ItemsProps, RecipeProps } from "../../../hooks/useMinecraftHook";

interface Props {
  items: ItemsProps[];
  recipes: RecipeProps[];
  title: string;
  bg: string;
  className?: string;
}

const CraftingTableWithTitleComponent = ({
  items,
  recipes,
  bg,
  title,
  className,
}: Props) => {
  return (
    <Flex
      bg={bg}
      paddingTop={4}
      paddingBottom={2}
      paddingLeft={2}
      paddingRight={2}
      borderRadius={"15px"}
      direction={"column"}
      className={className}
    >
      <Text
        fontFamily={"Roboto Remix"}
        lineHeight={0.1}
        fontSize={30}
        width={"100%"}
        align={"center"}
      >
        {title}
      </Text>
      <Show above="lg">
        <Box>
          <CraftingRecipeComponent
            items={items}
            recipes={recipes}
            craftingTableCellWidthHeight={"2.1em"}
          />
        </Box>
      </Show>
      <Show below="lg">
        <Box>
          <CraftingRecipeComponent
            items={items}
            recipes={recipes}
            craftingTableCellWidthHeight={"1.9em"}
          />
        </Box>
      </Show>
    </Flex>
  );
};

export default CraftingTableWithTitleComponent;
