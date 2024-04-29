import { useEffect } from "react";
import useMinecraftHook, { ItemsProps } from "../../../hooks/useMinecraftHook";
import "./MinecraftCardGird3.css";
import MinecraftItemCard from "./MinecraftItemCard";

interface Props {
  items: ItemsProps[];
  className?: string;
}

const MinecraftCardGrid3 = ({ items, className }: Props) => {
  const data = useMinecraftHook();
  return (
    <div className={`container ${className || ""}`}>
      {items.map((item) => (
        <div className="box">
          <MinecraftItemCard item={item} data={data}></MinecraftItemCard>
        </div>
      ))}
    </div>
  );
};

export default MinecraftCardGrid3;
