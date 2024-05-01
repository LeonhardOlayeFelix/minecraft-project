import { Menu, MenuButton, Button, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  options: string[];
  onCategoryChanged: (value: string) => void;
}

const CategorySelector = ({ options, onCategoryChanged }: Props) => {
  const [currentCategory, setCurrentCategory] = useState("All");

  const handleCategoryChanged = (value: string) => {
    setCurrentCategory(value);
    onCategoryChanged(value);
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<BsChevronDown />}>
        {"Category: " + currentCategory}
      </MenuButton>
      <MenuList zIndex={10}>
        {options.map((option, index) => (
          <MenuItem key={index} onClick={() => handleCategoryChanged(option)}>
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CategorySelector;
