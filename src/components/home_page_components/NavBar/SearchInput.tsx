import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";

interface Props {
  onInputChanged?: (input: string) => void;
}

const SearchInput = ({ onInputChanged }: Props) => {
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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

  const handleOnChanged = useCallback(
    debounce((input: string) => {
      setSearchIsLoading(false);
      window.localStorage.setItem("currentSearch", JSON.stringify(input));
      if (onInputChanged) {
        onInputChanged(input.trim());
      }
    }, 800),
    []
  );

  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input
        borderRadius={10}
        placeholder="Search Items..."
        variant={"filled"}
        value={searchInput}
        onChange={(event) => {
          setSearchIsLoading(true);
          setSearchInput(event.target.value);
          handleOnChanged(event.target.value);
        }}
      />
      <InputRightElement>{searchIsLoading && <Spinner />}</InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
