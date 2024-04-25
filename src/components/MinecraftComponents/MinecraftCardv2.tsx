import React, { useEffect, useState } from "react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import SimilarSearchesString from "./SimilarSearchesString";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";

interface Props {
  item: ItemsProps;
}

const MinecraftCardv2 = ({ item }: Props) => {
  let boxBg = useColorModeValue("white !important", "#111111");
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
    matches = matches.splice(0, Math.min(5, matches.length));
  }
  return (
    items &&
    item && (
      <Card
        borderRadius="20px"
        bg={boxBg}
        boxShadow="lg"
        overflow="hidden"
        transition="transform 0.2s"
        _hover={{ transform: "scale(1.02)" }}
        w={{ base: "230px", md: "280px" }}
        minH={{ base: "350px", md: "400px" }}
      >
        <Box h={190} pt={"20px"} pl={"20px"}>
          <Flex w="100%">
            <Box
              me="auto"
              className="grow-1"
              bg={secondaryBg}
              borderRadius={"5px"}
              padding={1}
            >
              {item && <Image src={item.image} />}
            </Box>
            <Button
              className="grow-1"
              w="38px"
              h="38px"
              alignItems="center"
              justifyContent="center"
              borderRadius="12px"
              me="13px"
              bg={iconBox}
            >
              <Icon
                w="24px"
                h="24px"
                as={IoEllipsisHorizontalSharp}
                color={iconColor}
              />
            </Button>
          </Flex>
          <Box>
            <Text
              fontFamily={"Roboto Remix"}
              fontWeight="500"
              color={mainText}
              w="100%"
              fontSize="35px"
            >
              {item && item.name}
            </Text>
            <Flex justifyContent={"left"}>
              <AvatarGroup size="sm" max={5} fontSize="9px" fontWeight="700">
                {matches.map((match, index) => (
                  <Tooltip label={match?.name}>
                    <Avatar
                      transition="transform 0.2s"
                      className="grow-1 p-1"
                      boxSize={10}
                      onClick={() => console.log(match?.name)}
                      cursor={"pointer"}
                      border={"white"}
                      name={item.name}
                      key={index}
                      src={match?.image}
                      _hover={{
                        bg: secondaryBg + "70",
                      }}
                    ></Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Flex>
          </Box>
        </Box>

        <CardBody bg={secondaryBg}>
          <Text
            /*fontFamily={"Roboto Remix"} fontSize={"20px"}*/ //use this to give the text a minecraft-y look
            fontWeight={"500"}
            fontSize={"md"}
            color={bodyText}
          >
            {item.description}
          </Text>
        </CardBody>
      </Card>
    )
  );
};

export default MinecraftCardv2;
