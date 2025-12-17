import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TabsHeader = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "sm:block hidden text-6xl font-bold mb-4 font-secondary writing-mode-vertical",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default TabsHeader;
