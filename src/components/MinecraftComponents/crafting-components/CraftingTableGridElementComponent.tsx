import { ItemsProps } from "../../../interfaces/MinecraftInterfaces";
import "./CraftingTableGridElementComponent.css";
import { Image, Tooltip, useColorModeValue } from "@chakra-ui/react";
interface Props {
  item: ItemsProps;
  className?: string;
  gridElementAnimation?: string;
  craftingTableCellWidthHeight?: string;
  handleMaterialClicked?: (materialName: string) => void;
}

const CraftingTableGridElementComponent = ({
  item,
  className,
  gridElementAnimation,
  craftingTableCellWidthHeight,
  handleMaterialClicked,
}: Props) => {
  const tooltipForeground = useColorModeValue("white", "white");
  const tooltipBackground = useColorModeValue("black", "#292D2E");
  const handleOnMaterialClicked = (materialName: string) => {
    if (handleMaterialClicked) {
      handleMaterialClicked(materialName);
    }
  };
  return (
    <div
      style={{
        width: craftingTableCellWidthHeight
          ? craftingTableCellWidthHeight
          : "var(--crafting-table-cell-width-height)",
        height: craftingTableCellWidthHeight
          ? craftingTableCellWidthHeight
          : "var(--crafting-table-cell-width-height)",
      }}
      className={"grid-element " + className}
    >
      {item && (
        <Tooltip
          label={item.name}
          bg={tooltipBackground}
          color={tooltipForeground}
        >
          <Image
            className={"displayed " + gridElementAnimation}
            src={item.image}
            alt={item.namespacedId || "..."}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            data-bs-delay={100}
            style={{ cursor: "pointer" }}
            onClick={() => handleOnMaterialClicked(item.name)}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default CraftingTableGridElementComponent;
