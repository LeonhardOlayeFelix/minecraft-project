import { useId } from "react";
import "./CraftingRecipeComponent.css";
import RecipeComponent from "./RecipeComponent";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import {
  RecipeProps,
  ItemsProps,
} from "../../../interfaces/MinecraftInterfaces";

interface Props {
  recipes: RecipeProps[]; //there might be multiple recipes, for example swords have 2 recipes: sword + sword or stick + diamond + diamond
  items: ItemsProps[];
  className?: string;
  gridElementAnimation?: string;
  gridResultAnimation?: string;
  craftingTableCellWidthHeight?: string;
}
//will show a list of recipe in a slide show format
const CraftingRecipeComponent = ({
  recipes,
  items,
  className,
  gridElementAnimation,
  gridResultAnimation,
  craftingTableCellWidthHeight,
}: Props) => {
  const carouselId = useId();
  const carouselArrowBg = useColorModeValue("black", "white");
  return (
    <Flex flexDirection={"row"} alignItems={"center"} className={className}>
      <Box>
        {recipes.length > 1 && (
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="prev"
          >
            <Box
              transition="transform 0.2s"
              _hover={{ transform: "scale(1.2)" }}
            >
              <span aria-hidden="true" className="carousel-left-arrow">
                &lt;
              </span>
            </Box>
            <span className="visually-hidden">Next</span>
          </button>
        )}
      </Box>
      <div
        style={{
          width: craftingTableCellWidthHeight
            ? `calc(${craftingTableCellWidthHeight} * 6.7)`
            : `calc(var(--crafting-table-cell-width-height) * 6.1)`,
        }}
        id="carousel-container"
      >
        <div id="crafting-outer-div">
          <div id={carouselId} className={"carousel carousel-dark slide"}>
            <div className="carousel-inner">
              {recipes.map((recipe, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  data-bs-interval="4000"
                >
                  <RecipeComponent
                    recipe={recipe}
                    gridElementAnimation={gridElementAnimation}
                    gridResultAnimation={gridResultAnimation}
                    items={items}
                    craftingTableCellWidthHeight={craftingTableCellWidthHeight}
                    display={
                      recipe.item +
                      (recipes.length > 1 ? ": (" + (index + 1) + ")" : "")
                    }
                  />
                </div>
              ))}
              {recipes.length === 0 && (
                <RecipeComponent
                  recipe={undefined as unknown as RecipeProps}
                  gridElementAnimation={gridElementAnimation}
                  gridResultAnimation={gridResultAnimation}
                  items={items}
                  craftingTableCellWidthHeight={craftingTableCellWidthHeight}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Box>
        <Box>
          {recipes.length > 1 && (
            <button
              type="button"
              data-bs-target={`#${carouselId}`}
              data-bs-slide="next"
            >
              <Box
                transition="transform 0.2s"
                _hover={{ transform: "scale(1.2)" }}
                marginLeft={1}
              >
                <span
                  aria-hidden="true"
                  className="carousel-right-arrow"
                  style={{ color: carouselArrowBg }}
                >
                  &gt;
                </span>
              </Box>
              <span className="visually-hidden">Next</span>
            </button>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default CraftingRecipeComponent;
