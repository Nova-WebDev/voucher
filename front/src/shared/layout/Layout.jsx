import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useState } from "react";

export const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div dir="rtl" className="flex">
      <Sidebar  isOpen={isOpen}  setIsOpen={setIsOpen}/>
      <div className="flex flex-col grow">
        <Header  isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
