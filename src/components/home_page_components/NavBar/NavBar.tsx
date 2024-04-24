import { Box, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import logo from "../../../assets/logo.webp";
import RightSideOfBarComponent from "./RightSideOfBarComponent";
const NavBar = () => {
  return (
    <HStack padding={"0.3em"} justifyContent={"space-between"}>
      <Image src={logo} boxSize={"60px"} />
      <RightSideOfBarComponent></RightSideOfBarComponent>
    </HStack>
  );
};

export default NavBar;
