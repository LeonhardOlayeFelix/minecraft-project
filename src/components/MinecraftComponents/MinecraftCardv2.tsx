import React, { useEffect, useState } from "react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import {
  Card,
  CardBody,
  Heading,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import SimilarSearchesString from "./SimilarSearchesString";

interface Props {
  item: ItemsProps;
}

const MinecraftCardv2 = ({ item }: Props) => {
  // Correctly using useState to initialize cardIsLoading

  // Use useEffect or other lifecycle methods to update state
  // to avoid setting state directly in the body of the component function
  // as this leads to side effects during rendering.
  useEffect(() => {}, []); // Empty dependency array ensures this runs only once after initial render

  let boxBg = useColorModeValue("white !important", "#151515");
  let secondaryBg = useColorModeValue("gray", "#202020");
  let mainText = useColorModeValue("gray.800", "white");
  let bodyText = useColorModeValue("gray.800", "white");
  let iconBox = useColorModeValue("gray.100", "whiteAlpha.200");
  let iconColor = useColorModeValue("brand.200", "white");
  const { items } = useBlocksAndItems();

  let matches: (ItemsProps | undefined)[] = [];

  if (item && items) {
    const itemsAsString = items.map((item) => item.name);
    const itemAsString = item.name;
    const similarSearches = SimilarSearchesString(itemsAsString, itemAsString);
    matches = similarSearches.map((result) =>
      items.find((itemfound) => itemfound.name === result)
    );
    matches = matches.splice(0, Math.min(6, matches.length));
    console.log(matches);
  }

  return (
    items &&
    item && (
      <Card>
        <Image boxSize={10} src={item.image} />
        <CardBody>
          <Heading>{item.name}</Heading>
        </CardBody>
      </Card>
    )
  );
};

export default MinecraftCardv2;
