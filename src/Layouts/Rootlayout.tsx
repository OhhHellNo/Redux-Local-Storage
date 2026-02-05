import Navbar from "@/Components/Navbar";
import { Outlet } from "react-router-dom";

const Rootlayout = () => {
  return (
    <div className="mt-4 bg-gray-100 min-h-screen">
      <Navbar></Navbar>
      <main className="flex-1">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default Rootlayout;
