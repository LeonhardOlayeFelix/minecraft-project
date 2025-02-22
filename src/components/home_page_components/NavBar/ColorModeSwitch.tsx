import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Box, Button, useColorMode } from "@chakra-ui/react";

const ColorModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  //const hoverBg = useColorModeValue("gray.100", "gray.600");
  return (
    <Box onClick={toggleColorMode}>
      {/* <Show above="768px">
        <Button
          transition="color 0.2s, text-decoration 0.2s"
          _hover={{
            textDecoration: "underline",
          }}
          flex="1"
          variant="ghost"
          leftIcon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
        >
          {(colorMode === "dark" ? "Dark" : "Light") + " Mode"}
        </Button>
      </Show>
      <Show below="767px">
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
      </Show> */}
      <Button
        variant={"unstyled"}
        bg={"transparent"}
        transition="none" // Disable all transitions
        _hover={{
          textDecoration: "underline",
          color: "rgba(101, 163, 60, 1)",
        }}
        color={"white"}
        flex="1"
        leftIcon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
      >
        {(colorMode === "dark" ? "Dark" : "Light") + " Mode"}
      </Button>
    </Box>
  );
};

export default ColorModeSwitch;
