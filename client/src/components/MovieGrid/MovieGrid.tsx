"use client";
import { Carousel } from "@/ui-lib/ui-lib.components/Carousel";
import { useState } from "react";

interface GridProps {
  items: string[] | Movie[] | Cast[] | MovieBackrop[];
  renderItem: (item: Cast & MovieBackrop & Movie) => JSX.Element;
  columns?: number;
  initialItemsToShow?: number;
  title?: string;
  buttonText?: string;
  noPaginations?: boolean;
}
export const MovieGrid = ({
  items,
  renderItem,
  initialItemsToShow = 6,
  title,
  columns,
  buttonText,
  noPaginations
}: GridProps) => {
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  const handleSeeMoreClick = () => {
    setItemsToShow(
      itemsToShow >= items.length ? initialItemsToShow : items.length
    );
  };
  const getGridColsClass = (cols: number) => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      default:
        return `grid-cols-${initialItemsToShow}`;
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl pt-10">{title}</h1>
      <div className="lg:hidden">
        <Carousel>{items?.map((item: any) => renderItem(item))}</Carousel>
      </div>
      <div className="max-lg:hidden">
        <section>
          <div
            className={`grid gap-10 2xl:max-w-fit ${getGridColsClass(
              columns ?? initialItemsToShow
            )}`}
          >
            {items?.slice(0, itemsToShow).map((item: any) => renderItem(item))}
          </div>
        </section>
        {items?.length >= itemsToShow || !noPaginations && (
          <div className="flex items-center pt-12">
            <div className="w-full h-1 bg-gradient-to-r from-[#262f66] to-[#0c1124] rounded-lg shadow-lg flex" />
            <button
              className="uppercase border-2 py-2 px-4 rounded-lg text-nowrap font-semibold"
              onClick={handleSeeMoreClick}
            >
              {itemsToShow >= items?.length ? "Show less" : buttonText}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
