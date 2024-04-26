import {
  Box,
  Card,
  CardBody,
  Flex,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";

const MinecraftSkeletonCard = () => {
  const avatarHover = useColorModeValue("gray", "#202020") + "70";
  const cardBodybg = useColorModeValue("gray", "#202020");
  const textColor = useColorModeValue("gray.800", "white");
  const cardColor = useColorModeValue("white !important", "#111111");
  const iconColor = useColorModeValue("brand.200", "white");
  const buttonColor = useColorModeValue("gray.100", "whiteAlpha.200");
  const textHoverColor = useColorModeValue("#797979", "#797979");
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
      <Box h={"155"} mb={1} pt="20px" pl="20px">
        <Flex
          w="100%"
          justifyContent={"space-between"}
          paddingRight={3}
          marginBottom={2}
          marginTop={1}
        >
          <SkeletonCircle />
          <SkeletonCircle />
        </Flex>
        <SkeletonText noOfLines={1} marginTop={8} paddingRight={4} />
        <Box
          borderRadius={"10px"}
          overflow={"hidden"}
          marginTop={8}
          width={"120px"}
        >
          <Skeleton height={"20px"} />
        </Box>
      </Box>
      <CardBody bg={cardBodybg}>
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <SkeletonText noOfLines={3} lineHeight={"2"} />
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
