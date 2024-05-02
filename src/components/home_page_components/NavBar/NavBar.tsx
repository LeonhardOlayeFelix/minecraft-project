import { Box, HStack, Image, Text, useColorModeValue } from "@chakra-ui/react";
import logo from "../../../assets/logo.webp";
import RightSideOfBarComponent from "./RightSideOfBarComponent";
import SearchInput from "./SearchInput";

interface Props {
  className?: string;
}

const NavBar = ({ className }: Props) => {
  return (
    <HStack className={className} justifyContent={"space-between"}>
      <RightSideOfBarComponent></RightSideOfBarComponent>
    </HStack>
  );
};

export default NavBar;
