import Masonry from "react-masonry-css";
import type { ReactNode } from "react";
import "./masonry.css";

interface MasonryGridProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  breakpointCols?: {
    default: number;
    [key: number]: number;
  };
  className?: string;
  columnClassName?: string;
}

const MasonryGrid = <T,>({
  items,
  renderItem,
  breakpointCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  },
  className = "my-masonry-grid",
  columnClassName = "my-masonry-grid_column",
}: MasonryGridProps<T>) => {
  return (
    <Masonry
      breakpointCols={breakpointCols}
      className={className}
      columnClassName={columnClassName}
    >
      {items.map((item, index) => renderItem(item, index))}
    </Masonry>
  );
};

export default MasonryGrid;
