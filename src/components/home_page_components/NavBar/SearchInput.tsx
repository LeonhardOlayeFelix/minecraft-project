import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useCallback } from "react";
import debounce from "lodash/debounce";

interface Props {
  onInputChanged?: (input: string) => void;
}

const SearchInput = ({ onInputChanged }: Props) => {
  const handleOnChanged = useCallback(
    debounce((input: string) => {
      if (onInputChanged) {
        onInputChanged(input.trim());
      }
    }, 1000),
    []
  );

  return (
    <InputGroup>
      <InputLeftElement children={<BsSearch />} />
      <Input
        borderRadius={20}
        placeholder="Search Items..."
        variant={"filled"}
        onChange={(event) => handleOnChanged(event.target.value)}
      />
    </InputGroup>
  );
};

export default SearchInput;
