import { Grid, GridItem, Show } from "@chakra-ui/react";
import NavBar from "./components/home_page_components/NavBar/NavBar";

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
      <GridItem area={"main"} bg={"red"}>
        main
      </GridItem>
      <GridItem area={"footer"} bg={"dodgerblue"}>
        footer
      </GridItem>
    </Grid>
  );
}

export default App;
