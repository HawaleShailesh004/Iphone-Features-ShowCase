import React from "react";

const Header = () => {
  return (
    <>
      <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">iPhone Showcase</h1>
        <nav className="space-x-4">
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
    </>
  );
};

export default Header;
