import {
  Flex,
  Button,
  Icon,
  AvatarGroup,
  Tooltip,
  Avatar,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { ItemsProps } from "../../../hooks/useMinecraftHook";
import SimilarSearchesString from "../SimilarSearchesString";
import { TiPin, TiPinOutline } from "react-icons/ti";

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
}: Props) => {
  const [isPinned, setIsPinned] = useState(false);
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
  const toggleIsPinned = () => {
    setIsPinned(!isPinned);
  };
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
          transition="color 0.2s"
          color={textColor}
          cursor={"pointer"}
          _hover={{ color: textHoverColor }}
          fontSize="35px"
          onClick={() => console.log(item.name)}
          lineHeight={"25px"}
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
