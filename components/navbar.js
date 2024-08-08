'use client';

import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiRobot2Line } from "react-icons/ri";
import Link from "next/link";
import "/app/globals.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-lg font-bold">
          <Link href="/" className="">
            <RiRobot2Line size={30} className="inline-block mr-3 mb-1 text-sky-500" />
          </Link>
          AI Customer Support
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="/login" className="hover:text-sky-500">
            Login
          </a>
          <a href="/register" className="hover:text-sky-500">
            Register
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
