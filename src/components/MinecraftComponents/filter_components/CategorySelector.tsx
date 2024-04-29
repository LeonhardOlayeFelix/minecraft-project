import { Menu, MenuButton, Button, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  options: string[];
}

const CategorySelector = ({ options }: Props) => {
  const [currentCategory, setCurrentCategory] = useState("All");
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {"Category: " + currentCategory}
      </MenuButton>
      <MenuList zIndex={10}>
        <MenuItem onClick={() => setCurrentCategory("All")}>All</MenuItem>
        {options.map((option) => (
          <MenuItem onClick={() => setCurrentCategory(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
