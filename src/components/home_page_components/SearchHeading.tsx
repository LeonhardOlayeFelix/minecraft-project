import { Heading } from "@chakra-ui/react";

interface Props {
  text: string;
}

const SearchHeading = ({ text }: Props) => {
  return (
    <Heading as="h1" textAlign={"center"}>
      {text}
    </Heading>
  );
};

export default SearchHeading;
