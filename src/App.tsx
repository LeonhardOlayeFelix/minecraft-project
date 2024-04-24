import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"nav" "main" "footer"`,
      }}
    >
      <GridItem area={"nav"} bg={"coral"}>
        nav
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
