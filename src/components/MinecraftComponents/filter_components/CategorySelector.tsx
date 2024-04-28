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
        <MenuList>
          {options.map((option) => (
            <MenuItem>{option}</MenuItem>
          ))}
        </MenuList>
      </MenuButton>
    </Menu>
  );
};

export default CategorySelector;
