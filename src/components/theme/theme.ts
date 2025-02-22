import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

// Define the expected properties manually
interface StyleFunctionProps extends Dict {
  colorMode: "light" | "dark";
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === 'dark' ? "#101112" : '#F3F3F3',
      },
    }),
  },
});

export default theme;