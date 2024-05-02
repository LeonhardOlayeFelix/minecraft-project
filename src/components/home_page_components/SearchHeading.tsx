import { Heading } from "@chakra-ui/react";
import React from "react";

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
