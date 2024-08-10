'use client';

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import "/app/globals.css";
import { usePathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import LanguageSwitcher from "./language";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";
  const t = useTranslations('Navbar');

  return (isDashboard) ? "" : (
    <nav className="text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-lg font-bold">
          <Link href="/" className="">
            <RiRobot2Line size={30} className="inline-block mr-3 mb-1 text-sky-500" />
          </Link>
          {t("support")}
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <LanguageSwitcher />
          <a href="/login" className="hover:text-sky-500 text-md font-bold">
            {t("login")}
          </a>
          <a href="/register" className="hover:text-sky-500 text-md font-bold">
            {t("register")}
          </a>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-transparent">
          <a href="#" className="block px-4 py-2 hover:bg-gray-600">
            Login
          </a>
          <a href="#" className="block px-4 py-2 hover:bg-gray-600">
            Register
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;