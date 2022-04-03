import React, { useState } from "react";
import NavbarMobileMenu from "./NavbarMobileMenu";
import { FiMenu } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

//For each navbar element
const navbarPages = ["Test", "Something", "Login"];
const navbarElements = navbarPages.map((navbarPage) => (
  <a
    key={navbarPage}
    className="no-underline text-gray-800 font-semibold"
    href={`#${navbarPage}`}
  >
    {navbarPage}
  </a>
));

//Navbar
const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <a className="text-2xl font-bold font-righteous no-underline text-accent-primary">
            notium
          </a>
        </div>
        <nav className="hidden md:block space-x-6">{navbarElements}</nav>
        <button
          type="button"
          aria-label="Toggle mobile menu"
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="rounded md:hidden focus:outline-none focus:ring focus:ring-gray-500 focus:ring-opacity-50"
        >
          {navbarOpen ? <FaTimes size={25} /> : <FiMenu size={25} />}
        </button>
      </div>

      {navbarOpen && <NavbarMobileMenu>{navbarElements}</NavbarMobileMenu>}
    </div>
  );
};
export default Navbar;
