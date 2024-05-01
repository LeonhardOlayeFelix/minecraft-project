import { Box, Flex, Grid, GridItem, filter } from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import useBlocksAndItems, { ItemsProps } from "./hooks/useMinecraftHook";
import "./assets/fonts/custom-font.css";
import CategorySelector from "./components/MinecraftComponents/filter_components/CategorySelector";
import categoriseItems, {
  categories,
} from "./components/MinecraftComponents/CategoriseItem";
import MinecraftCardGrid3 from "./components/MinecraftComponents/card_components/MinecraftCardGrid3";
import { useEffect, useState } from "react";
import getItemsInCategory from "./components/MinecraftComponents/GetItemsInCategory";

function App() {
  const data = useBlocksAndItems();
  const [currentCategory, setCurrentCategory] = useState("All");
  let filteredData = getItemsInCategory(currentCategory, data);

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
            <Box>
              <CategorySelector
                onCategoryChanged={(value) => setCurrentCategory(value)}
                options={categories}
              />
            </Box>
            <MinecraftCardGrid3
              items={filteredData.slice(0, 30)}
            ></MinecraftCardGrid3>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
