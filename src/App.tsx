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
  const [recipeBookBorderColor, setRecipeBookBorderColor] = useState(
    "rgb(255, 255, 255, 1)"
  );
  const cardColor = useColorModeValue("#181818 !important", "#0D0E0E");
  const recipeBookBgColor = useColorModeValue("#FFFFFF", "#0D0E0E");
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
  function changeAlpha(rgbaString: string, newAlpha: number): string {
    // Parse the existing RGBA string
    const match = rgbaString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (!match) {
      return "rgba(255, 255, 255, 1)";
    }

    // Extract RGB values and existing alpha
    const [, r, g, b, currentAlpha = "1"] = match;
    const alpha = parseFloat(currentAlpha);

    // Ensure the new alpha value is within bounds (0 to 1)
    const clampedAlpha = Math.max(0, Math.min(newAlpha, 1));

    // Create and return the modified RGBA string
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha.toFixed(2)})`;
  }
  const getMiddlePixelColor = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const middleX = Math.floor(img.width / 2);
          const middleY = Math.floor(img.height / 2);
          const radius = 10;
          let totalRed = 0;
          let totalGreen = 0;
          let totalBlue = 0;
          let totalAlpha = 0;
          let pixelCount = 0;
          for (let x = middleX - radius; x <= middleX + radius; x++) {
            for (let y = middleY - radius; y <= middleY + radius; y++) {
              const pixelData = ctx.getImageData(x, y, 1, 1).data;
              const red = pixelData[0];
              const green = pixelData[1];
              const blue = pixelData[2];
              const alpha = pixelData[3];

              // Check if the pixel color matches the pattern #ExExEx, to ignore the white space
              const isExExExPattern =
                red === green && green === blue && red % 17 === 0;

              if (!isExExExPattern) {
                totalRed += red;
                totalGreen += green;
                totalBlue += blue;
                totalAlpha += alpha;
                pixelCount++;
              }
            }
          }

          if (pixelCount === 0) {
            reject("No valid pixels found");
          } else {
            const avgRed = Math.round(totalRed / pixelCount);
            const avgGreen = Math.round(totalGreen / pixelCount);
            const avgBlue = Math.round(totalBlue / pixelCount);
            //const avgAlpha = Math.round(totalAlpha / pixelCount);
            const colorValue = `rgba(${avgRed}, ${avgGreen}, ${avgBlue}, ${
              100 / 255
            })`;
            resolve(colorValue);
          }
        } else {
          reject("Failed to get canvas context");
        }
      };
      img.onerror = reject;
      img.src = imageUrl;
    });
  };
  useEffect(() => {
    const fetchMiddlePixelColor = async () => {
      if (recipebook) {
        try {
          const color = await getMiddlePixelColor(recipebook);
          setRecipeBookBorderColor(color);
        } catch (error) {
          console.error("Error fetching middle pixel color:", error);
        }
      }
    };
    fetchMiddlePixelColor();
  }, [recipebook]);
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
                  <Box
                    padding={7}
                    borderRadius={30}
                    borderWidth="2px"
                    borderColor={changeAlpha(recipeBookBorderColor, 150 / 255)}
                    bg={recipeBookBgColor}
                  >
                    <Image
                      src={recipebook}
                      borderRadius="inherit" // Match the border radius of the box
                    />
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
