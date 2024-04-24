import { Box, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import logo from "../../../assets/logoPlaceholder.webp";
import ColorModeSwitch from "./ColorModeSwitch";
import RightSideOfBarComponents from "./RightSideOfBarComponent";
const NavBar = () => {
  return (
    <HStack padding={"0.3em"} justifyContent={"space-between"}>
      <Image src={logo} boxSize={"60px"} />
      <RightSideOfBarComponents></RightSideOfBarComponents>
    </HStack>
  );
};

export default NavBar;
