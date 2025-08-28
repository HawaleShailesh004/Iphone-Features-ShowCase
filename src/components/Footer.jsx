import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Iphone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
