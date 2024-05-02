import {
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface Props {
  options: string[];
  onCategoryChanged: (value: string) => void;
}

const CategorySelector = ({ options, onCategoryChanged }: Props) => {
  const [currentCategory, setCurrentCategory] = useState("All");
  const textHoverColor = useColorModeValue("#797979", "#797979");

  useEffect(() => {
    const localStorageCategoryShowing =
      window.localStorage.getItem("currentCategory");
    if (localStorageCategoryShowing) {
      setCurrentCategory(JSON.parse(localStorageCategoryShowing));
      onCategoryChanged(JSON.parse(localStorageCategoryShowing));
    }
  }, []);

  const handleCategoryChanged = (value: string) => {
    setCurrentCategory(value);
    onCategoryChanged(value);
    window.localStorage.setItem("currentCategory", JSON.stringify(value));
  };

  return (
    <Menu>
      <MenuButton
        transition="all 0.2s"
        bg="rgba(101, 163, 60, 0.3)"
        color="rgba(101, 163, 60, 1)"
        border="1px solid"
        borderColor="rgba(101, 163, 60, 1)"
        _hover={{
          bg: "rgba(101, 163, 60, 1)",
          color: "white",
        }}
        as={Button}
        rightIcon={<BsChevronDown />}
      >
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
