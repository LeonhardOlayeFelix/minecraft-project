import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { TiPinOutline } from "react-icons/ti";

const MinecraftSkeletonCard = () => {
  const cardBodybg = useColorModeValue("gray", "#202020");
  const cardColor = useColorModeValue("white !important", "#111111");
  const iconColor = useColorModeValue("brand.200", "white");
  const buttonColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const textStartColor = useColorModeValue("black", "white");
  const textEndColor = useColorModeValue("white", "black");
  const iconEndColor = useColorModeValue("white", "black");

  return (
    <Card
      borderRadius="20px"
      boxShadow="lg"
      bg={cardColor}
      overflow="hidden"
      w={{ base: "260px", md: "280px" }}
      transition="transform 0.2s"
      _hover={{ transform: "scale(1.02)" }}
      height={"320px"}
    >
      <Box h={"155"} mb={4} pt="20px" pl="20px">
        <Flex
          w="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
          paddingRight={3}
          marginBottom={2}
          marginTop={1}
        >
          <SkeletonCircle startColor={cardBodybg} endColor={iconEndColor} />
        </Flex>
        <SkeletonText
          noOfLines={1}
          marginTop={8}
          paddingRight={4}
          startColor={textStartColor}
          endColor={textEndColor}
        />
        <Box
          borderRadius={"10px"}
          overflow={"hidden"}
          marginTop={8}
          width={"120px"}
        >
          <Skeleton
            height={"20px"}
            startColor={cardBodybg}
            endColor={iconEndColor}
          />
        </Box>
      </Box>
      <CardBody bg={cardBodybg}>
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <SkeletonText
            marginTop={5}
            startColor={textStartColor}
            endColor={textEndColor}
            noOfLines={3}
            spacing="4"
          />
          {/* <Flex alignItems="center" justifyContent="space-between">
            HI
          </Flex> */}

          <Flex justifyContent="space-between"></Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MinecraftSkeletonCard;
