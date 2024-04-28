import { Menu, MenuButton, Button, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  title: string;
  options: string[];
}

const CategorySelector = ({ title, options }: Props) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {title}
      </MenuButton>
      <MenuList zIndex={10}>
        {options.map((option) => (
          <MenuItem>{option}</MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
