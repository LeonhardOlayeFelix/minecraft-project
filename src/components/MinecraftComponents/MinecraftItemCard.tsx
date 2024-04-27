import React, { useState, useEffect } from "react";
import { ItemsProps, RecipeProps } from "../../hooks/useMinecraftHook";
import usedInImage from "../../assets/usedin3.webp";
import {
  Box,
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
import { IoCubeOutline, IoMusicalNoteOutline } from "react-icons/io5";
import { MdExpandMore, MdExpandLess, MdAttachMoney } from "react-icons/md";
import { LuBeef, LuSwords } from "react-icons/lu";
import { GiCauldron } from "react-icons/gi";
import { PiPlant } from "react-icons/pi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import categoriseItems from "./CategoriseItem";
import MinecraftSkeletonCard from "./MinecraftSkeletonCard";
import { UseBlocksAndItemsResult } from "./CategoriseItem";
import CraftingTableWithTitleComponent from "./CraftingTableWithTitleComponent";
import MinecraftItemCardHead from "./MinecraftItemCardHead";

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
  const [showRecipe, setShowRecipe] = useState(false);
  const [showUsedIn, setShowUsedIn] = useState(false);
  const avatarHover = useColorModeValue("gray", "#20202050");
  const cardBodyBg = useColorModeValue("gray", "#202020");
  const textColor = useColorModeValue("gray.800", "white");
  const cardColor = useColorModeValue("white !important", "#111111");
  const iconColor = useColorModeValue("brand.200", "white");
  const buttonColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const textHoverColor = useColorModeValue("#797979", "#797979");
  const tooltipForeground = useColorModeValue("white", "white");
  const tooltipBackground = useColorModeValue("black", "#292D2E");

  const items = data.items;
  const recipes = data.recipes;
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
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
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
  const toggleShowRecipes = () => {
    setShowUsedIn(false);
    setShowRecipe(!showRecipe);
  };
  const toggleShowUsedIn = () => {
    setShowRecipe(false);
    setShowUsedIn(!showUsedIn);
  };
  const matchingRecipes = recipes.filter(
    (recipe) => recipe.item === item.name
  ) as RecipeProps[];
  const matchingIngredients = recipes?.filter((recipe) =>
    recipe.recipe.find((ingredient) => ingredient === item.name)
  );

  return (
    <Card
      className={className}
      borderRadius="20px"
      bg={cardColor}
      boxShadow={`0 0 20px 3px ${glowColor}`}
      overflow="hidden"
      // transition="transform 0.2s"
      // _hover={{ transform: "scale(1.02)" }}
      w={{ base: "260px", md: "280px" }}
      minH="auto"
    >
      <MinecraftItemCardHead
        bodyBg={cardBodyBg}
        buttonBg={buttonColor}
        iconColor={iconColor}
        textColor={textColor}
        textHoverColor={textHoverColor}
        avatarHoverBg={avatarHover}
        tooltipBg={tooltipBackground}
        tooltipFg={tooltipForeground}
        item={item}
        items={items}
      />
      <CardBody bg={cardBodyBg}>
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Flex
            alignItems="center"
            justifyContent="space-between"
            direction={"column"}
            marginBottom={2}
          >
            {
              <Text
                fontSize="2xl"
                color={textColor}
                lineHeight={"15px"}
                fontFamily="Roboto Remix"
                marginBottom={8}
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
            }
            {showRecipe && inRecipes && !showUsedIn && (
              <CraftingTableWithTitleComponent
                recipes={matchingRecipes}
                items={items}
                title="Recipe:"
                bg={cardColor + "50"}
                className="grow-1"
              />
            )}
            {showUsedIn && inIngredients && !showRecipe && (
              <CraftingTableWithTitleComponent
                recipes={matchingIngredients}
                items={items}
                title="Material for:"
                bg={cardColor + "50"}
                className="grow-1"
              />
            )}
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
                      <Box>
                        <HiOutlineInformationCircle
                          cursor={"pointer"}
                          onClick={() => toggleShowCategories()}
                        ></HiOutlineInformationCircle>
                      </Box>
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
                      label="Material for..."
                    >
                      <Box borderRadius={3} overflow={"hidden"}>
                        <Image
                          boxSize={5}
                          cursor={"pointer"}
                          src={usedInImage}
                          onClick={() => toggleShowUsedIn()}
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
                          onClick={() => toggleShowRecipes()}
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
