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
import { useMemo } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { ItemsProps } from "../../../hooks/useMinecraftHook";
import SimilarSearchesString from "../SimilarSearchesString";

interface Props {
  bodyBg: string;
  buttonBg: string;
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
  buttonBg,
  iconColor,
  textColor,
  textHoverColor,
  avatarHoverBg,
  tooltipBg,
  tooltipFg,
  item,
  items,
}: Props) => {
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
  return (
    <Box h={"auto"} mb={1} pt="20px" pl="20px">
      <Flex w="100%">
        <Box
          me="auto"
          className="grow-1"
          bg={bodyBg}
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
          bg={buttonBg}
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
                border="white"
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
