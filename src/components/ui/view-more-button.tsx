import { Button } from "./button";
import { ChevronRightIcon } from "lucide-react";

const ViewMoreButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <Button className="h-7 text-xs rounded-full pr-1.5 pl-3 font-secondary">
      {children}
      <span className="bg-white text-black rounded-full p-0.5">
        <ChevronRightIcon className="size-3" />
      </span>
    </Button>
  );
};

export default ViewMoreButton;
