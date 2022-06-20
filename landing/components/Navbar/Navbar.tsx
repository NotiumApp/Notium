import React, { useState } from "react";

import { FaTwitter } from "react-icons/fa";

//Navbar
const Navbar = () => {
  return (
    <div>
      <div className="z-40 relative w-full bg-transparent flex items-center justify-between p-4">
        <div className="flex items-center">
          <a className="text-2xl font-bold font-righteous no-underline text-accent-primary select-none">
            notium
          </a>
        </div>
        {/* <nav className="hidden md:block space-x-6">{navbarElements}</nav>
        <button
          type="button"
          aria-label="Toggle mobile menu"
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
        >
          {navbarOpen ? <FaTimes size={25} /> : <FiMenu size={25} />}
        </button> */}
        <div>
          <a href="https://twitter.com/NotiumApp">
            <FaTwitter size={30} className="text-[#1DA1F2]" />
          </a>
        </div>
      </div>

      {/* {navbarOpen && <NavbarMobileMenu>{navbarElements}</NavbarMobileMenu>} */}
    </div>
  );
};
export default Navbar;
