import { Flex, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import useBlocksAndItems, { RecipeProps } from "./hooks/useMinecraftHook";
import "./assets/fonts/custom-font.css";
import MinecraftCardGrid from "./components/MinecraftComponents/card_components/MinecraftCardGrid";
import CraftingRecipeComponent from "./components/MinecraftComponents/crafting-components/CraftingRecipeComponent";
import CategorySelector from "./components/MinecraftComponents/filter_components/CategorySelector";
import { categories } from "./components/MinecraftComponents/CategoriseItem";
import MinecraftCardGrid2 from "./components/MinecraftComponents/card_components/MinecraftCardGrid2";
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
          <Flex flexDirection={"column"} gap={"20px"}>
            <Flex>
              <CategorySelector title="Categories" options={categories} />
            </Flex>
            {/* <MinecraftCardGrid items={items.slice(400, 420)} /> */}
            <MinecraftCardGrid2
              items={items.slice(400, 420)}
            ></MinecraftCardGrid2>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
