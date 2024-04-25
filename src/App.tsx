import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Img,
  Show,
  SimpleGrid,
} from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import ItemList from "./components/MinecraftComponents/ItemList";
import HeaderImage from "./assets/minecraft-banner-1.jpg";
import MinecraftCardv1 from "./components/MinecraftComponents/MinecraftCardv1";
import useBlocksAndItems from "./hooks/useMinecraftHook";
import MinecraftCardv2 from "./components/MinecraftComponents/MinecraftCardv2";
import "./assets/fonts/custom-font.css";
function App() {
  const { items, isLoading, recipes } = useBlocksAndItems();
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: ` "Banner" "nav" "main" "footer"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar></NavBar>
      </GridItem>
      <GridItem area={"main"}>
        <Flex display={"flex"} justifyContent={"center"}>
          <SimpleGrid
            padding={10}
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            width={{ xl: "1300px", lg: "1000px", md: "700px", sm: "400px" }}
          >
            {/* {items.splice(0, 20).map((fff, index) => (
                <MinecraftCardv2 key={index} item={fff} />
              ))} */}
            {/* <Box display={"flex"} justifyContent={"center"}>
              <MinecraftCardv2
                className="grow-1"
                item={items.find((item) => item.name === "Diamond Sword")}
              />
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <MinecraftCardv2
                className="grow-1"
                item={items.find((item) => item.name === "Diamond Sword")}
              />
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <MinecraftCardv2
                className="grow-1"
                item={items.find((item) => item.name === "Diamond Sword")}
              />
            </Box>
            <Box display={"flex"} justifyContent={"center"}>
              <MinecraftCardv2
                className="grow-1"
                item={items.find((item) => item.name === "Acacia Wood")}
              />
            </Box> */}
            <Box className="mb-3" display={"flex"} justifyContent={"center"}>
              <MinecraftCardv2
                item={items.find((item) => item.name === "Note Block")}
              />
            </Box>
            {items.slice(300, 350).map((fff, index) => (
              <Box className="mb-3" display={"flex"} justifyContent={"center"}>
                <MinecraftCardv2 key={index} item={fff} />
              </Box>
            ))}
          </SimpleGrid>
        </Flex>
      </GridItem>

      <GridItem area={"footer"}></GridItem>
    </Grid>
  );
}

export default App;
