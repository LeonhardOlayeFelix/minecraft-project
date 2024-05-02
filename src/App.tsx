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
import SearchInput from "./components/home_page_components/NavBar/SearchInput";
import { wrap } from "framer-motion";
import SimilarSearchesString from "./components/MinecraftComponents/SimilarSearchesString";

function App() {
  const data = useBlocksAndItems();
  const [currentCategory, setCurrentCategory] = useState("Any");
  const [currentSearch, setCurrentSearch] = useState("");
  const [filteredData, setFilteredData] = useState<ItemsProps[]>([]);

  useEffect(() => {
    let updatedFilteredData = getItemsInCategory(currentCategory, data);

    if (currentSearch.trim() !== "") {
      const itemsAsString = updatedFilteredData.map((item) => item.name);
      const similarSearches = SimilarSearchesString(
        itemsAsString,
        currentSearch,
        0.3
      );

      updatedFilteredData = updatedFilteredData.filter((item) => {
        return (
          similarSearches.find(
            (similarSearch) => similarSearch === item.name
          ) !== undefined
        );
      });
    }

    setFilteredData(updatedFilteredData);
  }, [currentCategory, currentSearch, data]);

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
      <GridItem marginTop={100} area={"main"}>
        <Flex display={"flex"} justifyContent={"center"}>
          <Flex flexDirection={"column"} gap={"20px"}>
            <Flex
              justifyContent={{
                base: "center",
                sm: "center",
                md: "left",
                lg: "left",
              }}
              wrap={{
                base: "wrap",
                sm: "wrap",
                md: "nowrap",
                lg: "nowrap",
              }}
              gap={"10px"}
            >
              <Box width={"90%"}>
                <SearchInput
                  onInputChanged={(search) => setCurrentSearch(search)}
                ></SearchInput>
              </Box>
              <Box>
                <CategorySelector
                  onCategoryChanged={(value) => setCurrentCategory(value)}
                  options={categories}
                />
              </Box>
            </Flex>
            <Flex justifyContent={"center"}>
              <MinecraftCardGrid3
                items={filteredData.slice(0, 12)}
              ></MinecraftCardGrid3>
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
