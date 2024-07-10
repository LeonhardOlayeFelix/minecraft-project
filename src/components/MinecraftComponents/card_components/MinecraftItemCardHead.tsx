import {
  Flex,
  AvatarGroup,
  Tooltip,
  Avatar,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import SimilarSearchesString from "../SimilarSearchesString";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { ItemsProps } from "../../../interfaces/MinecraftInterfaces";

interface Props {
  bodyBg: string;
  iconColor: string;
  textColor: string;
  textHoverColor: string;
  avatarHoverBg: string;
  tooltipBg: string;
  tooltipFg: string;
  item: ItemsProps;
  items: ItemsProps[];
  handlePinToggle: (item: ItemsProps, isPinned: boolean) => void;
  handleIconClicked: (iconName: string) => void;
  rgba: string;
}

const MinecraftItemCardHead = ({
  bodyBg,
  iconColor,
  textColor,
  textHoverColor,
  avatarHoverBg,
  tooltipBg,
  tooltipFg,
  item,
  items,
  handlePinToggle,
  handleIconClicked,
  rgba,
}: Props) => {
  const [isPinned, setIsPinned] = useState(false);
  const [showNamespaceID, setShowNamespaceID] = useState(false);

  const itemsAsString = useMemo(() => items.map((item) => item.name), [items]);

  const similarSearches = useMemo(
    () => SimilarSearchesString(itemsAsString, item.name, 0.5),
    [itemsAsString, item.name]
  );
  const matches = useMemo(
    () =>
      similarSearches
        .map((result) => items.find((itemFound) => itemFound.name === result))
        .slice(1, 5),
    [similarSearches, items]
  );
  function changeAlpha(rgbaString: string, newAlpha: number): string {
    // Parse the existing RGBA string
    const match = rgbaString.match(
      /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/
    );
    if (!match) {
      return "rgba(255, 255, 255, 1)";
    }

    // Extract RGB values and existing alpha
    const [, r, g, b, currentAlpha = "1"] = match;
    const alpha = parseFloat(currentAlpha);

    // Ensure the new alpha value is within bounds (0 to 1)
    const clampedAlpha = Math.max(0, Math.min(newAlpha, 1));

    // Create and return the modified RGBA string
    return `rgba(${r}, ${g}, ${b}, ${clampedAlpha.toFixed(2)})`;
  }
  const toggleIsPinned = () => {
    handlePinToggle(item, !isPinned);
    setIsPinned(!isPinned);
    window.localStorage.setItem(
      item.name + "pinned",
      JSON.stringify(!isPinned)
    );
  };

  useEffect(() => {
    const localStoragePin = window.localStorage.getItem(item.name + "pinned");
    if (localStoragePin) setIsPinned(JSON.parse(localStoragePin));
  }, []);

  return (
    <Box h={"auto"} mb={1} mt="20px" ml="20px" mr={"20px"} marginBottom={"5px"}>
      <Flex w="100%" alignItems={"center"}>
        <Box
          me="auto"
          bg={changeAlpha(rgba, 50 / 255)}
          borderRadius="12px"
          padding={1}
        >
          {item.image && <Image src={item.image} />}
        </Box>
        <Tooltip
          label={isPinned ? "Remove from pins" : "Add to bookmarks"}
          background={tooltipBg}
          color={tooltipFg}
        >
          <Box
            position="relative"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="20px"
            height="20px"
            onClick={toggleIsPinned}
          >
            <FaRegBookmark
              fill={changeAlpha(rgba, 1)}
              color={iconColor}
              size={20}
              style={{
                position: "absolute",
              }}
            />
            <FaBookmark
              fill={textColor}
              color={iconColor}
              size={20}
              style={{
                position: "absolute",
                transition: "opacity 0.3s ease-in-out",
                opacity: isPinned ? 1 : 0,
              }}
            />
          </Box>
        </Tooltip>
      </Flex>
      <Flex>
        <Tooltip
          bg={tooltipBg}
          color={tooltipFg}
          hasArrow
          label={"Toggle namespace ID"}
        >
          <Text
            fontFamily="Roboto Remix"
            fontWeight="500"
            color={textColor}
            overflow={"hidden"}
            cursor="pointer"
            transition="color 0.2s, text-decoration 0.2s"
            _hover={{
              color: textHoverColor,
              textDecoration: "underline",
            }}
            fontSize="35px"
            onClick={() => setShowNamespaceID(!showNamespaceID)}
            lineHeight="25px"
            mt={3}
            paddingRight={3}
          >
            {showNamespaceID ? item.namespacedId : item.name}
          </Text>
        </Tooltip>
      </Flex>
      <Flex justifyContent="left">
        <AvatarGroup size="sm" max={4} fontSize="9px" fontWeight="700">
          {matches.map((match, index) => (
            <Tooltip
              bg={tooltipBg}
              color={tooltipFg}
              hasArrow
              label={match?.name}
              key={index}
            >
              <Avatar
                className="p-1"
                boxSize={8}
                onClick={() => handleIconClicked(match?.name ? match.name : "")}
                cursor="pointer"
                transition="background-color 0.2s"
                src={match?.image}
                _hover={{
                  bg: changeAlpha(rgba, 25 / 255),
                }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Flex>
    </Box>
  );
};

export default MinecraftItemCardHead;
