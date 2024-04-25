import React, { useEffect, useState } from "react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import SimilarSearchesString from "./SimilarSearchesString";
import {
  IoCubeOutline,
  IoEllipsisHorizontalSharp,
  IoMusicalNoteOutline,
} from "react-icons/io5";
import { MdExpandMore, MdExpandLess, MdAttachMoney } from "react-icons/md";
import { LuBeef, LuSwords } from "react-icons/lu";
import { IoIosCube } from "react-icons/io";
import { GiCauldron } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";
import { FaCompactDisc } from "react-icons/fa";

interface Props {
  item: ItemsProps;
  className?: string;
}

const MinecraftCardv2 = ({ item, className }: Props) => {
  const {
    items,
    toolsAndWeaponry,
    isLoading,
    blocks,
    potions,
    food,
    plants,
    valuables,
    musicDiscs,
  } = useBlocksAndItems();
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle description
  const avatarHover = useColorModeValue("gray", "#202020") + "70";
  const cardBodybg = useColorModeValue("gray", "#202020");
  const textColor = useColorModeValue("gray.800", "white");
  const cardColor = useColorModeValue("white !important", "#111111");
  const iconColor = useColorModeValue("brand.200", "white");
  const buttonColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const textHoverColor = useColorModeValue("#797979", "#797979");
  //const [dataIsReady, setDataIsReady] = useState(false);
  // useEffect(() => {
  //   console.log("toolsAndWeaponry data:", toolsAndWeaponry);
  //   if (!isLoading && toolsAndWeaponry) {
  //     setDataIsReady(true);
  //   }
  // }, [toolsAndWeaponry, isLoading]);
  const toggleDescription = () => setIsExpanded(!isExpanded); // Toggle function

  if (!items || !item) {
    return <p>Loading...</p>;
  }
  // Calculate matches using SimilarSearchesString
  const itemsAsString = items.map((item) => item.name);
  const itemAsString = item.name;
  const similarSearches = SimilarSearchesString(itemsAsString, itemAsString);
  let matches = similarSearches
    .map((result) => items.find((itemFound) => itemFound.name === result))
    .slice(0, 5);
  const shortenString = (value: string, length: number) => {
    let sentence = value.split(" ");
    let sentenceToReturn = "";
    let overflow = false;
    for (let i = 0; i < sentence.length; i++) {
      if (sentenceToReturn.length > length) {
        sentenceToReturn = sentenceToReturn + "...";
        overflow = true;
        break;
      } else {
        sentenceToReturn = sentenceToReturn + sentence[i] + " ";
      }
    }
    return { sentenceToReturn, overflow };
  };

  return (
    <Card
      className={className}
      borderRadius="20px"
      bg={cardColor}
      boxShadow="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
      w={{ base: "230px", md: "280px" }}
      minH="auto"
    >
      <Box h={190} pt="20px" pl="20px">
        <Flex w="100%">
          <Box
            me="auto"
            className="grow-1"
            bg={cardBodybg}
            borderRadius="5px"
            padding={1}
          >
            {item.image && (
              <Image
                src={item.image}
                transition={"transform 0.3s ease-in-out"}
                _hover={{ transform: "scale(1.1)" }}
              />
            )}
          </Box>
          <Button
            className="grow-1"
            w="38px"
            h="38px"
            alignItems="center"
            justifyContent="center"
            borderRadius="12px"
            me="13px"
            bg={buttonColor}
          >
            <Icon
              as={IoEllipsisHorizontalSharp}
              color={iconColor}
              w="24px"
              h="24px"
            />
          </Button>
        </Flex>
        <Text
          fontFamily="Roboto Remix"
          fontWeight="500"
          transition="color 0.2s"
          color={textColor}
          cursor={"pointer"}
          _hover={{ color: textHoverColor }}
          w="100%"
          fontSize="35px"
          onClick={() => console.log(item.name)}
        >
          {shortenString(item.name, 17).sentenceToReturn}
        </Text>
        <Flex justifyContent="left">
          <AvatarGroup size="sm" max={5} fontSize="9px" fontWeight="700">
            {matches.map((match, index) => (
              <Tooltip hasArrow label={match?.name} key={index}>
                <Avatar
                  className="grow-1 p-1"
                  boxSize={10}
                  onClick={() => console.log(match?.name)}
                  cursor="pointer"
                  border="white"
                  src={match?.image}
                  _hover={{
                    bg: avatarHover,
                  }}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Flex>
      </Box>
      <CardBody bg={cardBodybg}>
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <Text fontWeight="500" fontSize="md" color={textColor}>
              {isExpanded
                ? item.description
                : shortenString(item.description, 114).sentenceToReturn}
              {item.description.length > 114 && (
                <Icon
                  cursor={"pointer"}
                  as={isExpanded ? MdExpandLess : MdExpandMore}
                  w="20px"
                  h="20px"
                  onClick={toggleDescription}
                />
              )}
            </Text>
          </Flex>
          {!isLoading ? (
            <Flex gap={"10px"}>
              {toolsAndWeaponry?.find((tool) => tool.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Tools & Weapons">
                    <div>
                      <LuSwords className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
              {blocks?.find((block) => block.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Blocks">
                    <div>
                      <IoCubeOutline className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
              {potions?.find((potion) => potion.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Potions & Effects">
                    <div>
                      <GiCauldron className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
              {food?.find((munch) => munch.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Consumable">
                    <div>
                      <LuBeef className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
              {plants?.find((plant) => plant.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Plants">
                    <div>
                      <PiPlant className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
              {valuables?.find((valuable) => valuable.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Valuables">
                    <div>
                      <MdAttachMoney className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
              {musicDiscs?.find((disc) => disc.name === item.name) && (
                <>
                  <Tooltip hasArrow label="Music">
                    <div>
                      <IoMusicalNoteOutline className="grow-1" size={20} />
                    </div>
                  </Tooltip>
                </>
              )}
            </Flex>
          ) : (
            <Spinner />
          )}
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MinecraftCardv2;
