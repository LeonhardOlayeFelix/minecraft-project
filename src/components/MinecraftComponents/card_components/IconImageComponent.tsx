import { Box, Image } from "@chakra-ui/react";
import { ItemsProps } from "../../../interfaces/MinecraftInterfaces";

interface Props {
  item: ItemsProps;
  bg: string;
}

const IconImageComponent = ({ item, bg }: Props) => {
  return (
    <Box me="auto" className="grow-1" bg={bg} borderRadius="12px" padding={1}>
      {item.image && (
        <Image
          src={item.image}
          transition={"transform 0.3s ease-in-out"}
          _hover={{ transform: "scale(1.1)" }}
        />
      )}
    </Box>
  );
};

export default IconImageComponent;
