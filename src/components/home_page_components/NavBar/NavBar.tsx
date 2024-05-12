import { HStack } from "@chakra-ui/react";
import RightSideOfBarComponent from "./RightSideOfBarComponent";

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
