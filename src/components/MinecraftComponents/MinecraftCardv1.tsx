import React from "react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import {
  Card,
  Flex,
  Image,
  useColorModeValue,
  Text,
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Icon,
  others,
  Container,
  Stack,
  Tooltip,
} from "@chakra-ui/react";
import { MdTimer, MdVideoLibrary } from "react-icons/md";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import Fuse from "fuse.js";
import SimilarSearchesItems from "./SimilarSearchesItems";
import SimilarSearchesString from "./SimilarSearchesString";
interface Props {
  item: ItemsProps;
}

const MinecraftCardv1 = ({ item }: Props) => {
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
    matches = matches.splice(0, Math.min(5, matches.length));
  }

  return (
    items &&
    item && (
      <Flex
        borderRadius="20px"
        bg={boxBg}
        minH="340px"
        w={{ base: "240px", md: "310px" }}
        direction="column"
        transition="transform 0.2s"
        _hover={{
          transform: "scale(1.01)",
        }}
        boxShadow={"xl"}
      >
        <Box p="20px">
          <Flex w="100%" mb="10px">
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
              me="12px"
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
            <Text fontWeight="600" color={mainText} w="100%" fontSize="2xl">
              {item && item.name}
            </Text>
            <Flex alignItems={"center"} gap={"3px"} justifyContent={"left"}>
              <AvatarGroup size="sm" max={5} fontSize="9px" fontWeight="700">
                {matches.map((match, index) => (
                  <Tooltip label={match?.name}>
                    <Avatar
                      className="grow-1 p-1"
                      boxSize={10}
                      onClick={() => console.log(match?.name)}
                      cursor={"pointer"}
                      border={"white"}
                      name={item.name}
                      key={index}
                      src={match?.image}
                      _hover={{
                        bg: secondaryBg + "70", // Example of a white background with 50% opacity, // Example of a change on hover to a less transparent background
                      }}
                    ></Avatar>
                  </Tooltip>
                ))}
              </AvatarGroup>
            </Flex>
          </Box>
        </Box>
        <Flex
          bg={secondaryBg}
          w="100%"
          p="20px"
          borderBottomLeftRadius="inherit"
          borderBottomRightRadius="inherit"
          height="100%"
          direction="column"
        >
          <Text
            fontSize="sm"
            color={bodyText}
            lineHeight="24px"
            pe="40px"
            fontWeight="500"
            mb="auto"
          >
            {item && item.description.slice(0, 200)}
          </Text>
          <Flex>
            <Flex me="25px">
              <Icon as={MdTimer} w="20px" h="20px" me="6px" color="green.400" />
              <Text color={mainText} fontSize="sm" my="auto" fontWeight="500">
                Text2
              </Text>
            </Flex>
            <Flex>
              <Icon
                as={MdVideoLibrary}
                w="20px"
                h="20px"
                me="6px"
                color="red.500"
              />
              <Text color={mainText} fontSize="sm" my="auto" fontWeight="500">
                Text 1
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    )
  );
};

export default MinecraftCardv1;
