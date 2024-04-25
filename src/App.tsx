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
import useBlocksAndItems from "./hooks/useMinecraftHook";
import MinecraftCardv2 from "./components/MinecraftComponents/MinecraftCardv2";
import "./assets/fonts/custom-font.css";
import MinecraftGrid from "./components/MinecraftComponents/MinecraftGrid";
function App() {
  const { items, isLoading, recipes } = useBlocksAndItems();
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
          <MinecraftGrid items={items.slice(300, 330)} />
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
