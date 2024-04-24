import { Container, Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";
import ItemList from "./components/MinecraftComponents/ItemList";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"nav" "main" "footer"`,
      }}
    >
      <GridItem area={"nav"}>
        <NavBar></NavBar>
      </GridItem>
      <GridItem area={"main"}>
        <Container>
          <ItemList></ItemList>
        </Container>
      </GridItem>
      <GridItem area={"footer"}></GridItem>
    </Grid>
  );
}

export default App;
