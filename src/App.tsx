import {
  Container,
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
function App() {
  const { items } = useBlocksAndItems();
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
        <SimpleGrid
          columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
          spacing={10}
          padding={"10px"}
        >
          <MinecraftCardv2
            item={items.find((foundItem) => foundItem.name === "Diamond Sword")}
          />
          <MinecraftCardv1
            item={items.find((foundItem) => foundItem.name === "Diamond Sword")}
          />
          <MinecraftCardv1
            item={items.find((foundItem) => foundItem.name === "Wooden Shovel")}
          />
        </SimpleGrid>
      </GridItem>
      <GridItem area={"footer"}></GridItem>
    </Grid>
  );
}

export default App;
