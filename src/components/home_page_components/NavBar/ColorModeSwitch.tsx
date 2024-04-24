import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Show,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const hoverBg = useColorModeValue("gray.100", "gray.600");
  return (
    <Box onClick={toggleColorMode}>
      <Show above="md">
        <Button
          flex="1"
          variant="ghost"
          leftIcon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        >
          {(colorMode === "dark" ? "Dark" : "Light") + " Mode"}
        </Button>
      </Show>
      <Show below="md">
        <Box
          p="1"
          transition="background-color 0.3s"
          borderRadius="md"
          _hover={{
            backgroundColor: hoverBg, // Changes background color on hover
          }}
        >
          {colorMode === "dark" ? (
            <MoonIcon boxSize="1.3em" onClick={toggleColorMode} />
          ) : (
            <SunIcon boxSize="1.3em" onClick={toggleColorMode} />
          )}
        </Box>
      </Show>
    </Box>
  );
};

export default ColorModeSwitch;
