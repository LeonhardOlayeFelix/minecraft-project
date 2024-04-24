import ColorModeSwitch from "./ColorModeSwitch";
import { Box, useColorModeValue } from "@chakra-ui/react";

const RightSideOfBarComponents = () => {
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      display="flex"
      justifyContent={"left"}
      gap={"10px"}
      p="2"
      borderRadius="md"
      _hover={{ bg: hoverBg }}
      transition="background-color 0.3s"
    >
      <ColorModeSwitch></ColorModeSwitch>
    </Box>
  );
};

export default RightSideOfBarComponents;
