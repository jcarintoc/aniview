import { Button } from "../ui/button";
import { Search as SearchIcon, SearchX } from "lucide-react";

const Search = ({
  isOpen,
  handleToggleSearch,
}: {
  isOpen: boolean;
  handleToggleSearch: () => void;
}) => {
  return (
    <Button
      onClick={handleToggleSearch}
      className="rounded-full bg-transparent hover:bg-primary"
      size={"icon"}
    >
      {isOpen ? <SearchX /> : <SearchIcon />}
    </Button>
  );
};

export default Search;
