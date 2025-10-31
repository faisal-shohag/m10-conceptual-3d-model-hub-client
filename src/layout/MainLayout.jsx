import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="mt-4">
          <Outlet />
        </div>
      </div>

      <Toaster/>
    </div>
  );
};

export default MainLayout;
