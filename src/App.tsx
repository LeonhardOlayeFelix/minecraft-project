import { Grid, GridItem, Show } from "@chakra-ui/react";

function App() {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main" "footer"`,
        lg: `"poster" "nav" "main" "footer"`,
      }}
    >
      <Show above="lg">
        <GridItem area={"poster"} bg={"green"}>
          poster
        </GridItem>
      </Show>
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
