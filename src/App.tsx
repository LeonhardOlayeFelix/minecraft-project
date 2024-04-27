import { Flex, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import useBlocksAndItems, { RecipeProps } from "./hooks/useMinecraftHook";
import "./assets/fonts/custom-font.css";
import MinecraftCardGrid from "./components/MinecraftComponents/MinecraftCardGrid";
import CraftingRecipeComponent from "./components/MinecraftComponents/crafting-components/CraftingRecipeComponent";
function App() {
  const {
    items,
    blocks,
    recipes,
    isLoading,
    setItems,
    setBlocks,
    setRecipes,
    setIsLoading,
  } = useBlocksAndItems();
  const recipe1 = recipes.filter(
    (recipe) => recipe.item === "Bow"
  ) as RecipeProps[];

  const recipe2 = recipes.filter(
    (recipe) => recipe.item === "Torch"
  ) as RecipeProps[];

  const recipe3 = recipes.filter(
    (recipe) => recipe.item === "Beacon"
  ) as RecipeProps[];

  const recipe4 = recipes.filter(
    (recipe) => recipe.item === "Wooden Sword"
  ) as RecipeProps[];
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: ` "nav" "main" "footer"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar></NavBar>
      </GridItem>
      <GridItem area={"main"}>
        <Flex display={"flex"} justifyContent={"center"}>
          {/* <CraftingRecipeComponent
            recipes={recipe1}
            gridElementAnimation="grow-1"
            gridResultAnimation="grow-1"
            items={items}
            craftingTableCellWidthHeight={"2.2em"}
          /> */}
          <MinecraftCardGrid className="m-3" items={items.slice(330, 430)} />
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
