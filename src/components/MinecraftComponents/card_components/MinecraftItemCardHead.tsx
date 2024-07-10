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
        <Box me="auto" bg={bodyBg} borderRadius="12px" padding={1}>
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
              fill={textColor}
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
                transition: "opacity 0.9s ease-in-out",
                opacity: isPinned ? 1 : 0,
              }}
            />
          </Box>
        </Tooltip>
      </Flex>
      <Flex>
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
                  bg: avatarHoverBg,
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
