import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  useColorModeValue,
  Text,
  Image,
  Show,
  Link,
} from "@chakra-ui/react";
import recipebook from "./assets/recipebook.webp";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import "./assets/fonts/custom-font.css";
import CategorySelector from "./components/MinecraftComponents/filter_components/CategorySelector";
import { categories } from "./components/MinecraftComponents/CategoriseItem";
import { useEffect, useState } from "react";
import getItemsInCategory from "./components/MinecraftComponents/GetItemsInCategory";
import SearchInput from "./components/home_page_components/NavBar/SearchInput";
import CardPaginator from "./components/MinecraftComponents/CardPaginator";
import useBlocksAndItems from "./hooks/useMinecraftHook";
import { ItemsProps } from "./interfaces/MinecraftInterfaces";
import SimilarSearchesString from "./components/MinecraftComponents/SimilarSearchesString";

function App() {
  const data = useBlocksAndItems();
  const [currentCategory, setCurrentCategory] = useState("Any");
  const [currentSearch, setCurrentSearch] = useState("");
  const [pinnedItems, setPinnedItems] = useState<ItemsProps[]>([]);
  //const { colorMode, toggleColorMode } = useColorMode();
  const cardColor = useColorModeValue("#181818 !important", "#0D0E0E");
  //const textColor = useColorModeValue("gray.800", "white");
  useEffect(() => {
    const localStoragePinnedItems = localStorage.getItem("pinnedItems");
    if (localStoragePinnedItems)
      setPinnedItems(JSON.parse(localStoragePinnedItems));
  }, []);

  let filteredData = getItemsInCategory(currentCategory, data);

  if (currentCategory === "Bookmarks") {
    filteredData = pinnedItems;
  }

  if (currentSearch.trim() != "") {
    const itemsAsString = filteredData.map((item) => item.name);
    const similarSearches = SimilarSearchesString(
      itemsAsString,
      currentSearch,
      0.4
    );
    filteredData = similarSearches
      .map((itemName) => filteredData.find((item) => item.name === itemName))
      .filter((item) => item !== undefined);
  }

  const handlePinToggle = (item: ItemsProps, isPinned: boolean) => {
    if (isPinned) {
      setPinnedItems([...pinnedItems, item]);
      localStorage.setItem(
        "pinnedItems",
        JSON.stringify([...pinnedItems, item])
      );
    } else {
      setPinnedItems(
        pinnedItems.filter((pinnedItem) => pinnedItem.name !== item.name)
      );
      localStorage.setItem(
        "pinnedItems",
        JSON.stringify(
          pinnedItems.filter((pinnedItem) => pinnedItem.name !== item.name)
        )
      );
    }
  };

  const handleCategoryChanged = (value: string) => {
    setCurrentCategory(value);
  };

  const handleIconClicked = (iconName: string) => {
    setCurrentSearch(iconName);
  };

  const handleResultClicked = (resultName: string) => {
    setCurrentSearch(resultName);
  };

  const handleMaterialClicked = (materialName: string) => {
    setCurrentSearch(materialName);
  };
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
              <Image src={recipebook} boxSize={"80px"} />
            </Flex>
            <NavBar></NavBar>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem area={"main"}>
        <Flex
          paddingTop={{ base: "20px", sm: "20px", md: "50px", lg: "50px" }}
          display={"flex"}
          justifyContent={"center"}
        >
          <Flex flexDirection={"column"} gap={"20px"} minW={"60vw"}>
            <Flex margin={3} flexDirection={"column"}>
              <Flex
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                gap={10}
                px={10}
              >
                <Box>
                  <Heading
                    as="h1"
                    textAlign={{
                      base: "center",
                      sm: "center",
                      md: "center",
                      lg: "left",
                    }}
                    fontSize={60}
                  >
                    Minecraft Item Index
                  </Heading>
                  <Text
                    textAlign={{
                      base: "center",
                      sm: "center",
                      md: "center",
                      lg: "left",
                    }}
                  >
                    Minecraft Item Index is a searchable database of all
                    Minecraft (1.18) blocks and items.{" "}
                    <Show above="sm">
                      <br />
                      <br />
                      On this website, you can find each item's recipe or each
                      recipe that it is an ingredient for. Clicking on an item's
                      name will toggle it's ID, which can be used <br />
                      in expressions involving command blocks. You can also
                      bookmark items, and filter by those bookmarks or other
                      categories including{" "}
                      <Link
                        color="#65A33C"
                        onClick={() => setCurrentCategory("Plants")}
                      >
                        Plants
                      </Link>{" "}
                      or{" "}
                      <Link
                        color="#65A33C"
                        onClick={() => setCurrentCategory("Valuables")}
                      >
                        Valuables
                      </Link>
                      !
                    </Show>
                  </Text>
                </Box>
                <Show above="lg">
                  <Box>
                    <Image boxSize={200} src={recipebook}></Image>
                  </Box>
                </Show>
              </Flex>
            </Flex>
            <Box
              //background={colorMode === "dark" ? cardColor : "#E4DEDB88"}
              margin={3}
              minH={"100vh"}
            >
              <Flex
                paddingX={"2%"}
                flexDirection={"column"}
                gap={"20px"}
                minW={"60vw"}
              >
                <Box>
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
                    {"Searching in: "}
                    <Text as="span" color="#65A33C">
                      {currentCategory === "Any"
                        ? "All Items"
                        : currentCategory}
                    </Text>
                  </Heading>
                  <Text
                    as="h2"
                    fontSize={"15px"}
                    textAlign={{
                      base: "center",
                      sm: "center",
                      md: "left",
                      lg: "left",
                    }}
                  >
                    <u>Version:</u>
                    <strong> 1.18</strong>
                  </Text>
                </Box>
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
                      value={currentSearch}
                    ></SearchInput>
                  </Box>
                  <Box>
                    <CategorySelector
                      categoryToDisplay={currentCategory}
                      onCategoryChanged={(value) => setCurrentCategory(value)}
                      options={categories}
                    />
                  </Box>
                </Flex>
                <Flex justifyContent={"center"}>
                  <CardPaginator
                    handleCategoryChanged={handleCategoryChanged}
                    handlePinToggle={handlePinToggle}
                    handleIconClicked={handleIconClicked}
                    handleResultClicked={handleResultClicked}
                    handleMaterialClicked={handleMaterialClicked}
                    items={filteredData}
                    resultsPerPage={40}
                  ></CardPaginator>
                  {filteredData.length === 0 &&
                    currentCategory !== "Bookmarks" &&
                    !data.isLoading && (
                      <Text mt={3} textAlign={"center"}>
                        There were no matches found! <br /> Please check the
                        <strong> selected category</strong> and ensure your
                        search is correct, then try again.
                      </Text>
                    )}
                  {filteredData.length === 0 &&
                    !data.isLoading &&
                    currentCategory === "Bookmarks" && (
                      <Text mt={3} textAlign={"center"}>
                        You have no bookmarks! <br /> Please{" "}
                        <strong>click the bookmark icon</strong> on any cards to
                        add them to your bookmarks.
                      </Text>
                    )}
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
