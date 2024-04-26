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
      overflow="hidden"
      w={{ base: "260px", md: "280px" }}
      minH="auto"
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
        <Flex justifyContent="left">
          <SkeletonText noOfLines={1} skeletonHeight={"6"} />
        </Flex>
      </Box>
      <CardBody bg={cardBodybg}>
        <Flex
          direction={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Flex alignItems="center" justifyContent="space-between">
            <SkeletonText skeletonHeight={"5"} />
          </Flex>

          <Flex justifyContent="space-between">
            <Flex gap={"1px"} alignItems={"center"}>
              <SkeletonCircle />
            </Flex>
            <SkeletonCircle />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MinecraftSkeletonCard;
