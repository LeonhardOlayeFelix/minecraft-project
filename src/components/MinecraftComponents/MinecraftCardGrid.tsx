import useBlocksAndItems, { ItemsProps } from "../../hooks/useMinecraftHook";
import MinecraftItemCard from "./MinecraftItemCard";
import Masonry from "react-masonry-css";
import "./MinecraftGrid.css";
interface Props {
  items: ItemsProps[];
  className?: string;
}
const MinecraftCardGrid = ({ items, className }: Props) => {
  const breakpointColumnsObj = {
    default: 4,
    1300: 3,
    950: 2,
    600: 1,
  };
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={"my-masonry-grid " + className}
      columnClassName="my-masonry-grid_column"
    >
      {items.map((item, index) => (
        <div key={index}>
          <MinecraftItemCard data={useBlocksAndItems()} item={item} />
        </div>
      ))}
    </Masonry>
  );
};

export default MinecraftCardGrid;
