import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { navRoutes } from "./nav-routes";
import { cn } from "@/lib/utils";

const NavSheet = ({ children }: { children: ReactNode }) => {
  const activeLinkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-white text-sm font-secondary px-4 py-3 hover:bg-primary/10 rounded-full",
      isActive && "bg-primary/30 hover:bg-primary/30"
    );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="left" className="gap-0">
        <SheetHeader>
          <SheetTitle className="font-secondary text-2xl">AniView</SheetTitle>
          <SheetDescription className="font-secondary">
            Your ultimate destination for anime discovery and exploration.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-3 p-4">
          {navRoutes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              className={activeLinkClass}
            >
              {route.label}
            </NavLink>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavSheet;
