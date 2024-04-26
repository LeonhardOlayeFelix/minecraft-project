import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const MinecraftSkeletonCard = () => {
  return (
    <Card>
      <Skeleton w={{ base: "260px", md: "280px" }} height={"200px"}></Skeleton>
      <CardBody>
        <SkeletonText></SkeletonText>
      </CardBody>
    </Card>
  );
};

export default MinecraftSkeletonCard;
