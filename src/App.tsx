import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
  Text,
  Image,
} from "@chakra-ui/react";
import logo from "./assets/logo.webp";
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
        base: `"header" "main" "footer"`,
        lg: ` "header" "main" "footer"`,
      }}
    >
      <GridItem area={"header"}>
        <Flex justifyContent={"center"} background={cardColor}>
          <Flex flexDirection={"column"} justifyContent={"center"}>
            <Flex justifyContent={"center"}>
              <Image src={logo} boxSize={"80px"} />
            </Flex>
            <NavBar></NavBar>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem marginTop={"50px"} area={"main"}>
        <Flex display={"flex"} justifyContent={"center"}>
          <Flex flexDirection={"column"} gap={"10px"} minW={"60vw"}>
            <Flex flexDirection={"column"}>
              <Heading as="h1">Heading goes here</Heading>
              <Text>Description goes here</Text>
            </Flex>
            <Box
              background={cardColor}
              padding={"2%"}
              borderTopRadius={"10px"}
              minH={"100vh"}
              marginTop={"60px"}
            >
              <Flex flexDirection={"column"} gap={"20px"} minW={"60vw"}>
                <Heading
                  as="h2"
                  fontSize={"30px"}
                  textAlign={{
                    base: "center",
                    sm: "center",
                    md: "left",
                    lg: "left",
                  }}
                >
                  {"Searching in: " +
                    (currentCategory == "Any" ? "All Items" : currentCategory)}
                </Heading>
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
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
