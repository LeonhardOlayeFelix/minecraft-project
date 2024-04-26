import React, { useMemo, useState, useEffect } from "react";
import { ItemsProps } from "../../hooks/useMinecraftHook";
import usedInImage from "../../assets/usedin3.webp";
import cardBodyBg from "../../assets/mcthewildupdate.webp";
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
import { GiCauldron } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import categoriseItems from "./CategoriseItem";
import MinecraftSkeletonCard from "./MinecraftSkeletonCard";
import { UseBlocksAndItemsResult } from "./CategoriseItem";

interface Props {
  item: ItemsProps;
  className?: string;
  data: UseBlocksAndItemsResult;
}

const MinecraftItemCard = ({ item, className, data }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false); // State to toggle description
  const [showCategories, setShowCategories] = useState(false);
  const [glowColor, setGlowColor] = useState("");
  const [isGlowColorLoading, setIsGlowColorLoading] = useState(false);
  const avatarHover = useColorModeValue("gray", "#202020") + "70";
  const cardBodybg = useColorModeValue("gray", "#202020");
  const textColor = useColorModeValue("gray.800", "white");
  const cardColor = useColorModeValue("white !important", "#111111");
  const iconColor = useColorModeValue("brand.200", "white");
  const buttonColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const textHoverColor = useColorModeValue("#797979", "#797979");
  const tooltipForeground = useColorModeValue("white", "white");
  const tooltipBackground = useColorModeValue("black", "#292D2E70");
  const items = data.items;
  const isLoading = data.isLoading;
  //boolean data determining whether this item is in the following categories
  const {
    inWeaponsTools,
    inBlocks,
    inPotions,
    inConsumable,
    inPlants,
    inValuables,
    inMusical,
    inRecipes,
    inIngredients,
    inIngredientsOrRecipes,
    inCategoryExcludingRecipesAndIngredients,
  } = categoriseItems(item, data);

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
  useEffect(() => {
    const fetchMiddlePixelColor = async () => {
      if (item.image) {
        try {
          setIsGlowColorLoading(true);
          const color = await getMiddlePixelColor(item.image);
          setGlowColor(color);
        } catch (error) {
          console.error("Error fetching middle pixel color:", error);
        } finally {
          setIsGlowColorLoading(false);
        }
      }
    };
    fetchMiddlePixelColor();
  }, [item.image]);
  const shortenString = (value: string, length: number) => {
    if (value.length <= length)
      return { sentenceToReturn: value, overflow: false };

    const words = value.split(" ");
    let truncatedString = "";
    let overflow = false;

    for (let word of words) {
      const potentialString = truncatedString + word;
      if (potentialString.length > length) {
        truncatedString += "...";
        overflow = true;
        break;
      }
      truncatedString += `${word} `;
    }

    return { sentenceToReturn: truncatedString.trim(), overflow };
  };

  //average colour of the image
  const getMiddlePixelColor = (imageUrl: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const middleX = Math.floor(img.width / 2);
          const middleY = Math.floor(img.height / 2);
          const radius = 5;
          let totalRed = 0;
          let totalGreen = 0;
          let totalBlue = 0;
          let totalAlpha = 0;
          let pixelCount = 0;

          for (let x = middleX - radius; x <= middleX + radius; x++) {
            for (let y = middleY - radius; y <= middleY + radius; y++) {
              const pixelData = ctx.getImageData(x, y, 1, 1).data;
              totalRed += pixelData[0];
              totalGreen += pixelData[1];
              totalBlue += pixelData[2];
              totalAlpha += pixelData[3];
              pixelCount++;
            }
          }

          const avgRed = Math.round(totalRed / pixelCount);
          const avgGreen = Math.round(totalGreen / pixelCount);
          const avgBlue = Math.round(totalBlue / pixelCount);
          const avgAlpha = Math.round(totalAlpha / pixelCount);

          const colorValue = `rgba(${avgRed}, ${avgGreen}, ${avgBlue}, ${
            100 / 255
          })`;
          resolve(colorValue);
        } else {
          reject("Failed to get canvas context");
        }
      };
      img.onerror = reject;
      img.src = imageUrl;
    });
  };

  const toggleDescription = () => setIsExpanded(!isExpanded);
  const toggleShowCategories = () => {
    setShowCategories(!showCategories);
  };
  const handleTooltipClicked = (
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    console.log((event.target as HTMLElement).id);
  };
  if (!items || !item || isLoading || isGlowColorLoading) {
    //this will do functionality based on whether the cards are loading
    return <MinecraftSkeletonCard />;
  }
  return (
    <Card
      className={className}
      borderRadius="20px"
      bg={cardColor}
      boxShadow={`0 0 20px 3px ${glowColor}`}
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
          lineHeight={"25px"}
          mt={3}
          paddingRight={3}
        >
          {item.name}
        </Text>
        <Flex justifyContent="left">
          <AvatarGroup size="sm" max={4} fontSize="9px" fontWeight="700">
            {matches.map((match, index) => (
              <Tooltip
                bg={tooltipBackground}
                color={tooltipForeground}
                hasArrow
                label={match?.name}
                key={index}
              >
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
            <Text
              fontSize="2xl"
              color={textColor}
              lineHeight={"15px"}
              fontFamily="Roboto Remix"
            >
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
                    <Tooltip
                      bg={tooltipBackground}
                      color={tooltipForeground}
                      hasArrow
                      label="Categories"
                    >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Tools & Weapons"
                        >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Blocks"
                        >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Potions & Effects"
                        >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Consumable"
                        >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Plants"
                        >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Valuables"
                        >
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
                        <Tooltip
                          bg={tooltipBackground}
                          color={tooltipForeground}
                          hasArrow
                          label="Musical"
                        >
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
                    <Tooltip
                      bg={tooltipBackground}
                      color={tooltipForeground}
                      hasArrow
                      label="Used in"
                    >
                      <Box borderRadius={3} overflow={"hidden"}>
                        <Image
                          boxSize={5}
                          cursor={"pointer"}
                          src={usedInImage}
                        ></Image>
                      </Box>
                    </Tooltip>
                  </>
                )}
                {inRecipes && (
                  <>
                    <Tooltip
                      bg={tooltipBackground}
                      color={tooltipForeground}
                      hasArrow
                      label="Show recipe"
                    >
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
