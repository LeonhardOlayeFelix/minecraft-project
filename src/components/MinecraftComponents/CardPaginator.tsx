import { useEffect, useState } from "react";
import useMinecraftHook, { ItemsProps } from "../../hooks/useMinecraftHook";
import "./card_components/MinecraftCardGird3.css";
import MinecraftItemCard from "./card_components/MinecraftItemCard";
import { Box, Flex, Button, HStack, Text } from "@chakra-ui/react";

interface Props {
  items: ItemsProps[];
  className?: string;
  handlePinToggle: (item: ItemsProps, isPinned: boolean) => void;
  resultsPerPage: number;
}

const CardPaginator = ({
  items,
  className,
  handlePinToggle,
  resultsPerPage,
}: Props) => {
  const data = useMinecraftHook();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = items.slice(indexOfFirstResult, indexOfLastResult);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <Flex className={className} flexDirection={"column"}>
      <Box className={`container`}>
        {currentResults.map((item, index) => (
          <div key={index} className="box">
            <MinecraftItemCard
              handlePinToggle={handlePinToggle}
              item={item}
              data={data}
            ></MinecraftItemCard>
          </div>
        ))}
      </Box>
      <Box mt={4}>
        <Flex justifyContent={"center"}>
          <Text>
            Showing {indexOfFirstResult} -{" "}
            {Math.min(indexOfLastResult, items.length)} of {items.length}{" "}
            results
          </Text>
        </Flex>
        <HStack spacing={2} justifyContent="center">
          {startPage > 1 && (
            <>
              <Button onClick={() => paginate(1)}>1</Button>
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
              <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
            </>
          )}
        </HStack>
      </Box>
    </Flex>
  );
};

export default CardPaginator;
