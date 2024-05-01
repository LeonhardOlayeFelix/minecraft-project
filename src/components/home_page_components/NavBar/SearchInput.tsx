import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";

interface Props {
  onInputChanged?: (input: string) => void;
}

const SearchInput = ({ onInputChanged }: Props) => {
  const [searchIsLoading, setSearchIsLoading] = useState(false);

  const handleOnChanged = useCallback(
    debounce((input: string) => {
      setSearchIsLoading(false);
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
        borderRadius={20}
        placeholder="Search Items..."
        variant={"filled"}
        onChange={(event) => {
          setSearchIsLoading(true);
          handleOnChanged(event.target.value);
        }}
      />
      <InputRightElement>{searchIsLoading && <Spinner />}</InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;
