import Navbar from "@/components/nav/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="space-y-4">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
