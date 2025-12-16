import { Link, NavLink } from "react-router-dom";
import { navRoutes } from "./nav-routes";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-neutral-400 hover:text-neutral-600 text-sm",
      isActive && "text-primary"
    );

  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4 py-2 px-4">
        <div className="flex items-center gap-8">
          <Link to="/">AniView</Link>
          <nav className="flex items-center gap-4">
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

        <Input className="w-full sm:w-72 border-border" type="text" placeholder="Search" />
      </div>
    </header>
  );
};

export default Navbar;
