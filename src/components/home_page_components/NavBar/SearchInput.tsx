import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface Props {
  onInputchanged?: (input: string) => void;
}

const SearchInput = ({ onInputchanged }: Props) => {
  const handleOnChanged = (input: string) => {
    console.log(input);
    if (onInputchanged) {
      onInputchanged(input);
    }
  };
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
