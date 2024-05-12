import ColorModeSwitch from "./ColorModeSwitch";
import { Box } from "@chakra-ui/react";
import ContactUsComponent from "./ContactUsComponent";

const RightSideOfBarComponent = () => {
  // const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      display="flex"
      justifyContent={"left"}
      gap={"5px"}
      p="1.5"
      borderRadius="md"
      // _hover={{ bg: hoverBg }} include this for a hover effect on the whole component
      transition="background-color 0.3s"
    >
      <ColorModeSwitch></ColorModeSwitch>
      <ContactUsComponent></ContactUsComponent>
    </Box>
  );
};

export default RightSideOfBarComponent;
