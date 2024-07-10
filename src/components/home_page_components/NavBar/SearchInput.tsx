import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { MdClear } from "react-icons/md";

interface Props {
  onInputChanged?: (input: string) => void;
  value?: string;
}

const SearchInput = ({ onInputChanged, value = "" }: Props) => {
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState(value);
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    const localStorageCurrentSearch =
      window.localStorage.getItem("currentSearch");
    if (localStorageCurrentSearch) {
      const parsedSearch = JSON.parse(localStorageCurrentSearch);
      setSearchIsLoading(true);
      setSearchInput(parsedSearch);
      handleOnChanged(parsedSearch);
    }
  }, []);

  useEffect(() => {
    setSearchInput(value);
  }, [value]);

  const handleOnChanged = useCallback(
    debounce((input: string) => {
      setSearchIsLoading(false);
      window.localStorage.setItem("currentSearch", JSON.stringify(input));
      if (onInputChanged) {
        onInputChanged(input.trim());
      }
    }, 500),
    []
  );

  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input
        borderRadius={10}
        bg={colorMode === "dark" ? "#191A1B" : "#191A1B22"}
        placeholder="Search Items..."
        variant={"filled"}
        value={searchInput}
        onChange={(event) => {
          setSearchIsLoading(true);
          setSearchInput(event.target.value);
          handleOnChanged(event.target.value);
        }}
      />
      {searchIsLoading && (
        <InputRightElement mr={8}>
          <Spinner />
        </InputRightElement>
      )}
      <InputRightElement>
        <MdClear
          cursor={"pointer"}
          onClick={() => {
            setSearchIsLoading(true);
            setSearchInput("");
            handleOnChanged("");
          }}
          size={25}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
