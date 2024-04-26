import React, { useEffect, useMemo, useState } from "react";
import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import usedInImage from "../../assets/usedin.png";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardBody,
  Divider,
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
import { GoGear } from "react-icons/go";
import { HiOutlineInformationCircle } from "react-icons/hi";

interface Props {
  item: ItemsProps;
  className?: string;
}

const MinecraftItemCard = ({ item, className }: Props) => {
  const {
    items,
    toolsAndWeaponry,
    isLoading,
    blocks,
    potions,
    consumable,
    plants,
    valuables,
    musicDiscs,
    recipes,
  } = useBlocksAndItems();
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle description
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState(false);
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

  //Determines whether the following item is in any of the following categories, storing the item if it is. WILL NEED FOR LATER

  ///////////////////////////////////////////////////////////////////////////////////////////////////

  const inWeaponsTools = toolsAndWeaponry?.find(
    (tool) => tool.name === item.name
  );
  const inBlocks = blocks?.find((block) => block.name === item.name);

  const inPotions = potions?.find((potion) => potion.name === item.name);

  const inConsumable = consumable?.find((munch) => munch.name === item.name);

  const inPlants = plants?.find((plant) => plant.name === item.name);

  const inValuables = valuables?.find(
    (valuable) => valuable.name === item.name
  );

  const inMusical = musicDiscs?.find((disc) => disc.name === item.name);

  const inRecipes = recipes?.find((recipe) => recipe.item === item.name);

  const inIngredients = recipes?.find((recipe) =>
    recipe.recipe.find((ingredient) => ingredient === item.name)
  );

  const inIngredientsOrRecipes = inRecipes || inIngredients;

  const inCategoryExcludingRecipesAndIngredients =
    inWeaponsTools ||
    inBlocks ||
    inPotions ||
    inConsumable ||
    inPlants ||
    inValuables ||
    inMusical;

  const inCategory =
    inCategoryExcludingRecipesAndIngredients || inRecipes || inIngredients;

  ////////////////////////////////////////////////////////////////////////////////////////////////

  // Calculate matches using SimilarSearchesString
  const itemsAsString = useMemo(() => items.map((item) => item.name), [items]);
  const similarSearches = useMemo(
    () => SimilarSearchesString(itemsAsString, item.name),
    [itemsAsString, item.name]
  );
  const matches = useMemo(
    () =>
      similarSearches
        .map((result) => items.find((itemFound) => itemFound.name === result))
        .slice(0, 4),
    [similarSearches, items]
  );
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
  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
  };
  const handleTooltipClicked = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    console.log((event.target as HTMLElement).id);
  };
  // if (!items || !item ||isLoading) { //this will do functionality based on whether the cards are loading
  //   return <p>Loading...</p>;
  // }
  return (
    <Card
      className={className}
      borderRadius="20px"
      bg={cardColor}
      boxShadow="lg"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
      w={{ base: "260px", md: "280px" }}
      minH="auto"
    >
      <Box h={"auto"} mb={1} pt="20px" pl="20px">
        <Flex w="100%">
          <Box
            me="auto"
            className="grow-1"
            bg={cardBodybg}
            borderRadius="12px"
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
          lineHeight={"1"}
          mt={3}
        >
          {item.name}
        </Text>
        <Flex justifyContent="left">
          <AvatarGroup size="sm" max={4} fontSize="9px" fontWeight="700">
            {matches.map((match, index) => (
              <Tooltip hasArrow label={match?.name} key={index}>
                <Avatar
                  className="grow-1 p-1"
                  boxSize={8}
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

          <Flex justifyContent="space-between">
            <Flex gap={"1px"} alignItems={"center"}>
              {inCategoryExcludingRecipesAndIngredients && (
                <Flex alignItems={"center"}>
                  <Box marginRight={2}>
                    <Tooltip hasArrow label="Categories">
                      <div>
                        <HiOutlineInformationCircle
                          cursor={"pointer"}
                          onClick={() => toggleShowCategories()}
                        ></HiOutlineInformationCircle>
                      </div>
                    </Tooltip>
                  </Box>
                  <Flex
                    visibility={showCategories ? "visible" : "hidden"}
                    bg={cardColor + "50"}
                    padding={"6px"}
                    borderRadius={"6px"}
                  >
                    {inWeaponsTools && (
                      <>
                        <Tooltip hasArrow label="Tools & Weapons">
                          <div>
                            <LuSwords
                              id="Tools & Weapons"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {inBlocks && (
                      <>
                        <Tooltip hasArrow label="Blocks">
                          <div>
                            <IoCubeOutline
                              id="Blocks"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {inPotions && (
                      <>
                        <Tooltip hasArrow label="Potions & Effects">
                          <div>
                            <GiCauldron
                              id="Potions & Effects"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {inConsumable && (
                      <>
                        <Tooltip hasArrow label="Consumable">
                          <div>
                            <LuBeef
                              id="Consumable"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {inPlants && (
                      <>
                        <Tooltip hasArrow label="Plants">
                          <div>
                            <PiPlant
                              id="Plants"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {inValuables && (
                      <>
                        <Tooltip hasArrow label="Valuables">
                          <div>
                            <MdAttachMoney
                              id="Valuables"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                    {inMusical && (
                      <>
                        <Tooltip hasArrow label="Musical">
                          <div>
                            <IoMusicalNoteOutline
                              id="Musical"
                              cursor={"pointer"}
                              onClick={handleTooltipClicked}
                              className="grow-1"
                              size={20}
                            />
                          </div>
                        </Tooltip>
                      </>
                    )}
                  </Flex>
                </Flex>
              )}
            </Flex>
            {inIngredientsOrRecipes && (
              <Flex gap={"10px"} alignItems={"center"}>
                <Divider orientation="vertical" />
                {inIngredients && (
                  <>
                    <Tooltip hasArrow label="Used in">
                      <div>
                        <Image
                          boxSize={5}
                          cursor={"pointer"}
                          src={usedInImage}
                        ></Image>
                      </div>
                    </Tooltip>
                  </>
                )}
                {inRecipes && (
                  <>
                    <Tooltip hasArrow label="Show recipe">
                      <div>
                        <Image
                          boxSize={6}
                          cursor={"pointer"}
                          src="https://minecraft-api.vercel.app/images/blocks/crafting_table.png"
                        ></Image>
                      </div>
                    </Tooltip>
                  </>
                )}
              </Flex>
            )}
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MinecraftItemCard;
