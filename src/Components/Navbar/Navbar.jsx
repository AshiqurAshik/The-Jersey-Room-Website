import React from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-[#0B3D2E] ">
      <nav className="max-w-7xl mx-auto flex justify-between items-center py-5">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white">
          The <span className="text-[#C8F169]">Jersey</span> Room
        </Link>

        <div className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-md font-medium transition-colors duration-300 ${
                isActive
                  ? 'text-[#C8F169]'
                  : 'text-[#F5F5F0] hover:text-[#C8F169]'
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-md font-medium transition-colors duration-300 ${
                isActive
                  ? 'text-[#C8F169]'
                  : 'text-[#F5F5F0] hover:text-[#C8F169]'
              }`
            }
          >
            Products
          </NavLink>

          {/* <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-md font-medium transition-colors duration-300 ${
                isActive
                  ? 'text-[#C8F169]'
                  : 'text-[#F5F5F0] hover:text-[#C8F169]'
              }`
            }
          >
            Contact
          </NavLink> */}
        </div>

        <Link
          to="/cart"
          className="rounded-lg border border-[#2F2F2F] bg-[#1C1C1C] px-4 py-2 text-md font-medium text-[#F5F5F0] transition-all duration-300 hover:border-[#C8F169] hover:text-[#C8F169]"
        >
          View Cart
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
