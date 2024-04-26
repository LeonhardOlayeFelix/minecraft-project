import React, { useId, useState } from "react";
import { RecipeProps, ItemsProps } from "../../../hooks/useMinecraftHook";
import "./CraftingRecipeComponent.css";
import RecipeComponent from "./RecipeComponent";
import { Box, Flex } from "@chakra-ui/react";

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
  return (
    <Flex flexDirection={"row"} alignItems={"center"} className={className}>
      <Box>
        {recipes.length > 1 && (
          <button
            type="button"
            data-bs-target={`#${carouselId}`}
            data-bs-slide="prev"
          >
            <span aria-hidden="true" className="carousel-left-arrow">
              &lt;
            </span>
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
          <div
            id={carouselId}
            className={"carousel carousel-dark slide"}
            data-bs-ride="carousel"
          >
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
                      (recipes.length > 1 ? ": (" + index + ")" : "")
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
              <span aria-hidden="true" className="carousel-right-arrow">
                &gt;
              </span>
              <span className="visually-hidden">Next</span>
            </button>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default CraftingRecipeComponent;
