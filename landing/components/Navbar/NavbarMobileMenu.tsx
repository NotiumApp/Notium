import React from "react";

//Navbar for mobile users
const NavbarMobileMenu: React.FC = ({ children }) => (
  <nav className="p-4 flex flex-col space-y-3 md:hidden">{children}</nav>
);

export default NavbarMobileMenu;
