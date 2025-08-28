import React from "react";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className="text-lg md:text-xl font-bold">iPhone Showcase</h1>

      {/* Navigation Links */}
      <nav className="space-x-2 md:space-x-4 md:px-10">
        <a href="#" className="hover:underline">
          Home
        </a>
        <a href="#features" className="hover:underline">
          Features
        </a>
        <a href="#contact" className="hover:underline">
          Support
        </a>
      </nav>
    </header>
  );
};

export default Header;
