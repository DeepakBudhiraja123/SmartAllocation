import React from "react";
import assets from "../assets/assets";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative bg-white shadow-md">
      {/* First Row: Title */}
      <div className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-orange-500 via-blue-400 to-green-600 bg-clip-text text-transparent">
          NeoPragati
        </h1>
      </div>

      {/* Second Row: Navbar */}
      <div className="flex justify-between items-center px-8 py-4 bg-blue-600 text-white">
        <nav className="flex gap-10 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-300 transition-colors">
            Home
          </Link>
          <Link
            to="/internships"
            className="hover:text-yellow-300 transition-colors"
          >
            Internships
          </Link>
          <Link
            to="/students"
            className="hover:text-yellow-300 transition-colors"
          >
            Students
          </Link>
        </nav>
      </div>

      {/* Quarter Circle with Image */}
      <div className="absolute top-0 right-0 h-full w-48 flex items-center justify-center overflow-hidden">
        <div className="h-48 w-48 rounded-l-full shadow-lg flex items-center justify-center bg-white-300">
          <img
            src={assets.pm_img}
            alt="PM"
            className="h-32 w-32 rounded-full border-4 border-white shadow-md"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
