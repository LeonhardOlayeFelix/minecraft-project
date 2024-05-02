import {
  Box,
  Flex,
  Grid,
  GridItem,
  filter,
  useColorModeValue,
} from "@chakra-ui/react";
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
import SimilarSearchBarItem from "./components/MinecraftComponents/SimilarSearchBarItem";

function App() {
  const data = useBlocksAndItems();
  const [currentCategory, setCurrentCategory] = useState("Any");
  const [currentSearch, setCurrentSearch] = useState("");
  const cardColor = useColorModeValue("white !important", "#111111");

  let filteredData = getItemsInCategory(currentCategory, data);

  if (currentSearch.trim() != "") {
    const itemsAsString = filteredData.map((item) => item.name);
    // let similarSearches = SimilarSearchesString(
    //   itemsAsString,
    //   currentSearch,
    //   0.5
    // );
    const similarSearches = SimilarSearchBarItem(itemsAsString, currentSearch);
    filteredData = filteredData.filter((item) => {
      return (
        similarSearches.find((similarSearch) => similarSearch == item.name) !=
        undefined
      );
    });
    console.log(filteredData);
  }

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
          <Box
            background={cardColor}
            paddingTop={"2%"}
            paddingX={"2%"}
            borderTopRadius={"20px"}
            minH={"100vh"}
          >
            <Flex flexDirection={"column"} gap={"20px"} minW={"60vw"}>
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
                  items={filteredData.slice(0, 20)}
                ></MinecraftCardGrid3>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
