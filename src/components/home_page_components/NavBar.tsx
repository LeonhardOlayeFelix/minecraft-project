import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../../assets/logoPlaceholder.webp";
const NavBar = () => {
  return (
    <HStack>
      <Image src={logo} boxSize={"60px"} />
      <Text className="mt-3">Nav Bar</Text>
    </HStack>
  );
};

export default NavBar;
