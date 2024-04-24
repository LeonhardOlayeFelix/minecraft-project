import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  LightMode,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { BiChat } from "react-icons/bi";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box onClick={toggleColorMode}>
      <Button
        flex="1"
        variant="ghost"
        leftIcon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
      >
        {(colorMode === "dark" ? "Dark" : "Light") + " Mode"}
      </Button>
    </Box>
  );
};

export default ColorModeSwitch;
