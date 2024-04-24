import Navbar from "./Navbar";
// import Footer from './Footer';

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col h-screen">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isSidebarOpen={isSidebarOpen} />
          <main className={`flex-1 bg-[#D9E8F3] mt-14 ${isSidebarOpen || "lg:ml-64"}`}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
