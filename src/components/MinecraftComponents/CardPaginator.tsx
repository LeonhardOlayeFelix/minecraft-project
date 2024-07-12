import { useEffect, useState } from "react";
import "./card_components/MinecraftCardGird3.css";

import {
  Box,
  Flex,
  Button,
  HStack,
  Text,
  Show,
  Spinner,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ItemsProps } from "../../interfaces/MinecraftInterfaces";
import useMinecraftHook from "../../hooks/useMinecraftHook";
import MinecraftCardGrid3 from "./card_components/MinecraftCardGrid3";
import MinecraftCardGrid from "./card_components/MinecraftCardGrid";

interface Props {
  items: ItemsProps[];
  className?: string;
  handlePinToggle: (item: ItemsProps, isPinned: boolean) => void;
  handleCategoryChanged: (category: string) => void;
  handleIconClicked: (iconName: string) => void;
  handleResultClicked?: (resultName: string) => void;
  handleMaterialClicked?: (materialName: string) => void;
  handleCardHover?: (color: string) => void;
  resultsPerPage: number;
}

const CardPaginator = ({
  items,
  className,
  handlePinToggle,
  handleCategoryChanged,
  handleIconClicked,
  handleResultClicked,
  handleMaterialClicked,
  handleCardHover,
  resultsPerPage,
}: Props) => {
  const data = useMinecraftHook();
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = items.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const pageNumbers = [];
  const totalPages = Math.ceil(items.length / resultsPerPage);

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (startPage <= 0) {
    endPage -= startPage - 1;
    startPage = 1;
  }

  if (endPage > totalPages) {
    endPage = totalPages;
    if (endPage > 5) {
      startPage = endPage - 4;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages]);
  if (data.isLoading) {
    return <Spinner></Spinner>;
  }
  return (
    <Flex className={className} flexDirection={"column"}>
      {/* <MinecraftCardGrid
        handleCategoryChanged={handleCategoryChanged}
        handlePinToggle={handlePinToggle}
        handleIconClicked={handleIconClicked}
        handleResultClicked={handleResultClicked}
        handleMaterialClicked={handleMaterialClicked}
        items={currentResults}
        data={data}
      ></MinecraftCardGrid> */}
      <MinecraftCardGrid3
        items={currentResults}
        handleCategoryChanged={handleCategoryChanged}
        handlePinToggle={handlePinToggle}
        handleIconClicked={handleIconClicked}
        handleResultClicked={handleResultClicked}
        handleMaterialClicked={handleMaterialClicked}
        handleCardHover={handleCardHover}
        data={data}
      ></MinecraftCardGrid3>
      {items.length != 0 && (
        <Box mt={4}>
          <Flex justifyContent={"center"}>
            <Text>
              Showing {indexOfFirstResult} -{" "}
              {Math.min(indexOfLastResult, items.length)} of {items.length}{" "}
              results
            </Text>
          </Flex>

          <Show above="768px">
            <Flex justifyContent={"center"}>
              {totalPages > 1 && (
                <Box
                  bg={"rgba(101, 163, 60, 0.3)"}
                  border="1px solid"
                  borderColor="rgba(101, 163, 60, 1)"
                  padding={2}
                  borderRadius={5}
                >
                  <HStack spacing={2} justifyContent="center">
                    {totalPages > 1 && currentPage > 1 && (
                      <Button
                        variant={"ghost"}
                        onClick={() => paginate(Math.max(currentPage - 1, 1))}
                      >
                        <ChevronLeftIcon />
                      </Button>
                    )}
                    {startPage > 1 && (
                      <>
                        <Button
                          variant={
                            currentPage === startPage ? "solid" : "ghost"
                          }
                          onClick={() => paginate(1)}
                        >
                          1
                        </Button>
                        {startPage > 2 && <span>...</span>}
                      </>
                    )}
                    {pageNumbers.map((number) => (
                      <Button
                        key={number}
                        onClick={() => paginate(number)}
                        variant={currentPage === number ? "solid" : "ghost"}
                      >
                        {number}
                      </Button>
                    ))}
                    {endPage < totalPages && (
                      <>
                        {endPage < totalPages - 1 && <span>...</span>}
                        <Button
                          variant={currentPage === endPage ? "solid" : "ghost"}
                          onClick={() => paginate(totalPages)}
                        >
                          {totalPages}
                        </Button>
                      </>
                    )}
                    {totalPages > 1 && currentPage < totalPages && (
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          paginate(Math.min(currentPage + 1, totalPages))
                        }
                      >
                        <ChevronRightIcon />
                      </Button>
                    )}
                  </HStack>
                </Box>
              )}
            </Flex>
          </Show>
          <Show below="767px">
            <Flex justifyContent={"center"}>
              {totalPages > 1 && (
                <Box
                  bg={"rgba(101, 163, 60, 0.3)"}
                  border="1px solid"
                  borderColor="rgba(101, 163, 60, 1)"
                  padding={2}
                  borderRadius={5}
                >
                  <HStack spacing={2} justifyContent="center">
                    {totalPages > 1 && currentPage > 1 && (
                      <Button
                        variant={"ghost"}
                        onClick={() => paginate(Math.max(currentPage - 1, 1))}
                      >
                        <ChevronLeftIcon />
                      </Button>
                    )}
                    {
                      <>
                        <Button variant="solid">{currentPage}</Button>
                      </>
                    }

                    {totalPages > 1 && currentPage < totalPages && (
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          paginate(Math.min(currentPage + 1, totalPages))
                        }
                      >
                        <ChevronRightIcon />
                      </Button>
                    )}
                  </HStack>
                </Box>
              )}
            </Flex>
          </Show>
        </Box>
      )}
    </Flex>
  );
};

export default CardPaginator;
