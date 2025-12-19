import { Link, NavLink } from "react-router-dom";
import { navRoutes } from "./nav-routes";
import Search from "./Search";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import NavSheet from "./NavSheet";
import { Activity, useState, useEffect } from "react";
import SearchCommand from "./SearchCommand";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Disable body scroll when search is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
  
  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-white text-sm font-secondary hover:opacity-80",
      isActive && "bg-primary/30 px-4 py-1 rounded-full"
    );

  const handleToggleSearch = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <header className="z-40 fixed top-5 left-1/2 -translate-x-1/2  w-full xl:w-7xl px-5">
        <div className="flex items-center justify-between gap-4 py-2 px-2 bg-accent/65 backdrop-blur-sm rounded-full shadow-lg">
          <div className="flex items-center gap-3 md:gap-8">
            <NavSheet>
              <Button size={"icon"} className="md:hidden rounded-full">
                <Menu />
              </Button>
            </NavSheet>
            <Link
              to="/"
              className="font-secondary md:px-4 md:py-2 md:bg-primary md:rounded-full text-sm md:text-base"
            >
              AniView
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navRoutes.map((route) => (
                <NavLink
                  key={route.path}
                  to={route.path}
                  className={activeLinkClass}
                >
                  {route.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <Search isOpen={isOpen} handleToggleSearch={handleToggleSearch} />
        </div>
      </header>

      <Activity mode={isOpen ? "visible" : "hidden"}>
        <SearchCommand handleClose={handleToggleSearch} />
      </Activity>
    </>
  );
};

export default Navbar;
