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
import { categories } from "./components/MinecraftComponents/CategoriseItem";
import MinecraftCardGrid3 from "./components/MinecraftComponents/card_components/MinecraftCardGrid3";
import { useEffect, useState } from "react";
import getItemsInCategory from "./components/MinecraftComponents/GetItemsInCategory";
import SearchInput from "./components/home_page_components/NavBar/SearchInput";
import SimilarSearchBarItem from "./components/MinecraftComponents/SimilarSearchBarItem";

function App() {
  const data = useBlocksAndItems();
  const [currentCategory, setCurrentCategory] = useState("Any");
  const [currentSearch, setCurrentSearch] = useState("");
  const [pinnedItems, setPinnedItems] = useState<ItemsProps[]>([]);
  const cardColor = useColorModeValue("white !important", "#0D0E0E");

  useEffect(() => {
    const localStoragePinnedItems = localStorage.getItem("pinnedItems");
    if (localStoragePinnedItems)
      setPinnedItems(JSON.parse(localStoragePinnedItems));
  }, []);

  let filteredData = getItemsInCategory(currentCategory, data);

  if (currentCategory === "Pinned") {
    filteredData = pinnedItems;
  }

  if (currentSearch.trim() != "") {
    const itemsAsString = filteredData.map((item) => item.name);
    const similarSearches = SimilarSearchBarItem(itemsAsString, currentSearch);
    filteredData = filteredData.filter((item) => {
      return (
        similarSearches.find((similarSearch) => similarSearch == item.name) !=
        undefined
      );
    });
    console.log(filteredData);
  }

  const handlePinToggle = (item: ItemsProps, isPinned: boolean) => {
    if (isPinned) {
      setPinnedItems([...pinnedItems, item]);
      localStorage.setItem(
        "pinnedItems",
        JSON.stringify([...pinnedItems, item])
      );
      // console.log([...pinnedItems, item]);
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

  return (
    <Grid
      templateAreas={{
        base: `"header" "main" "footer"`,
        lg: ` "header" "main" "footer"`,
      }}
    >
      <GridItem area={"header"}>
        <Flex
          borderBottom={"1px solid"}
          borderColor="rgba(101, 163, 60, 0.2)"
          justifyContent={"center"}
          background={cardColor}
        >
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
            <Flex margin={3} flexDirection={"column"}>
              <Heading
                as="h1"
                textAlign={{
                  base: "center",
                  sm: "center",
                  md: "left",
                  lg: "left",
                }}
              >
                Heading goes here
              </Heading>
              <Text
                textAlign={{
                  base: "center",
                  sm: "center",
                  md: "left",
                  lg: "left",
                }}
              >
                Description goes here
              </Text>
            </Flex>
            <Box
              borderTop={"1px solid"}
              borderX="1px solid"
              borderColor="rgba(101, 163, 60, 0.2)"
              background={cardColor}
              paddingY={"2%"}
              paddingX={"20px"}
              borderTopRadius={{
                base: "0px",
                sm: "10px",
                md: "10px",
                lg: "10px",
              }}
              minH={"100vh"}
              marginTop={"60px"}
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
                    {"Searching in: " +
                      (currentCategory == "Any"
                        ? "All Items"
                        : currentCategory)}
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
                    Version: 1.18
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
                    handlePinToggle={handlePinToggle}
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
