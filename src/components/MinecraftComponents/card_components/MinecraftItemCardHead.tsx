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
import { TiPin, TiPinOutline } from "react-icons/ti";
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
}: Props) => {
  const [isPinned, setIsPinned] = useState(false);

  const itemsAsString = useMemo(() => items.map((item) => item.name), [items]);

  const similarSearches = useMemo(
    () => SimilarSearchesString(itemsAsString, item.name, 0.5),
    [itemsAsString, item.name]
  );
  const matches = useMemo(
    () =>
      similarSearches
        .map((result) => items.find((itemFound) => itemFound.name === result))
        .slice(0, 4),
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
        {isPinned && (
          <Tooltip
            label="Remove from pins"
            background={tooltipBg}
            color={tooltipFg}
          >
            <Box>
              <TiPin
                fill="rgba(101, 163, 60, 1)"
                cursor={"pointer"}
                onClick={toggleIsPinned}
                color={iconColor}
                size={20}
              />
            </Box>
          </Tooltip>
        )}
        {!isPinned && (
          <Tooltip label="Add to pins" background={tooltipBg} color={tooltipFg}>
            <Box>
              <TiPinOutline
                cursor={"pointer"}
                onClick={toggleIsPinned}
                color={iconColor}
                size={20}
              />
            </Box>
          </Tooltip>
        )}
      </Flex>
      <Flex>
        <Text
          fontFamily="Roboto Remix"
          fontWeight="500"
          color={textColor}
          cursor="pointer"
          transition="color 0.2s, text-decoration 0.2s"
          _hover={{
            color: textHoverColor,
            textDecoration: "underline",
          }}
          fontSize="35px"
          onClick={() => console.log(item.name)}
          lineHeight="25px"
          mt={3}
          paddingRight={3}
        >
          {item.name}
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
                className="grow-1 p-1"
                boxSize={8}
                onClick={() => console.log(match?.name)}
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
