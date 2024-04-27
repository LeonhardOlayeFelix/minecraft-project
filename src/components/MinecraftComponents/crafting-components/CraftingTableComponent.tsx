import { useEffect, useState } from "react";
import { ItemsProps, RecipeProps } from "../../../hooks/useMinecraftHook";
import CraftingTableGridElementComponent from "./CraftingTableGridElementComponent";
import "./CraftingTableComponent.css";
interface Props {
  recipe: RecipeProps;
  items: ItemsProps[];
  className?: string;
  gridElementAnimation?: string;
  craftingTableCellWidthHeight?: string;
  onLoad: () => void;
}

const CraftingTableComponent = ({
  recipe,
  items,
  className,
  gridElementAnimation,
  craftingTableCellWidthHeight,
  onLoad,
}: Props) => {
  const [processedRecipe, setProcessedRecipe] = useState<string[]>([]);

  const processRecipe = (recipe: (string | string[] | null)[]): string[] => {
    return recipe.map((ingredient): string => {
      if (ingredient === null) {
        return "Air";
      } else if (Array.isArray(ingredient)) {
        return ingredient[0];
      } else {
        return ingredient;
      }
    });
  };

  useEffect(() => {
    if (recipe) {
      setProcessedRecipe(processRecipe(recipe.recipe));
      onLoad();
    }
  }, [recipe]);

  return (
    <div className={className}>
      <div
        style={{
          width: craftingTableCellWidthHeight
            ? `calc(${craftingTableCellWidthHeight} * 3)`
            : `calc(var(--crafting-table-cell-width-height) * 3)`,
        }}
        id="grid"
      >
        {recipe &&
          processedRecipe.map((name, index) => (
            <div key={index}>
              <CraftingTableGridElementComponent
                gridElementAnimation={gridElementAnimation}
                item={items.find((item) => item.name === name) as ItemsProps}
                craftingTableCellWidthHeight={craftingTableCellWidthHeight}
              />
            </div>
          ))}
        {!recipe &&
          //Need to show an empty grid if recipe does not exist
          Array.from({ length: 9 }, (_, index) => (
            <div key={index}>
              <CraftingTableGridElementComponent
                gridElementAnimation={gridElementAnimation}
                item={items.find((item) => item.name === "Air") as ItemsProps}
                craftingTableCellWidthHeight={craftingTableCellWidthHeight}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CraftingTableComponent;
