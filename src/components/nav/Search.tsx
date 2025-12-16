import { Button } from "../ui/button";
import { Search as SearchIcon, SearchX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Activity, useState } from "react";

const Search = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggleSearch = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleToggleSearch}
        className="rounded-full bg-transparent hover:bg-primary"
        size={"icon"}
      >
        {isOpen ? <SearchX /> : <SearchIcon />}
      </Button>
      <Activity mode={isOpen ? "visible" : "hidden"}>
        <Input
          className="w-full md:w-60 border-border rounded-full placeholder:font-secondary"
          type="text"
          placeholder="Search"
        />
      </Activity>
    </div>
  );
};

export default Search;
