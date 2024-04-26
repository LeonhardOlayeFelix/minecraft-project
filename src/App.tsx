import { Flex, Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import useBlocksAndItems from "./hooks/useMinecraftHook";
import "./assets/fonts/custom-font.css";
import MinecraftCardGrid from "./components/MinecraftComponents/MinecraftCardGrid";
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
          <MinecraftCardGrid items={items.slice(330, 360)} />
        </Flex>
      </GridItem>
    </Grid>
  );
}

export default App;
