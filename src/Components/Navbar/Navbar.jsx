import React, { useState } from 'react';
import { Link, NavLink } from 'react-router';
import {
  HiMenu,
  HiX,
  HiOutlineShoppingBag,
  HiHome,
} from 'react-icons/hi';
import { GiTShirt } from 'react-icons/gi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative text-md font-medium transition-colors duration-300 py-1 ${
      isActive ? 'text-[#C8F169]' : 'text-[#F5F5F0] hover:text-[#C8F169]'
    } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-[#C8F169] after:transition-all after:duration-300 ${
      isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex items-center gap-3 py-3 text-lg font-medium transition-colors duration-300 ${
      isActive ? 'text-[#C8F169]' : 'text-[#F5F5F0] hover:text-[#C8F169]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-[#0B3D2E] border-b border-white/10 shadow-md shadow-black/10">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl sm:text-2xl font-bold tracking-tight text-white"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-[#C8F169]" />
          The <span className="text-[#C8F169]">Jersey</span> Room
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={linkClass}>
            <span className="flex items-center gap-2">
              <HiHome size={18} />
              Home
            </span>
          </NavLink>

          <NavLink to="/products" className={linkClass}>
            <span className="flex items-center gap-2">
              <GiTShirt size={18} />
              Products
            </span>
          </NavLink>

          <Link
            to="/cart"
            className="flex items-center gap-2 rounded-lg bg-[#C8F169] px-4 py-2 font-semibold text-[#0B3D2E] transition-all duration-300 hover:bg-white hover:shadow-lg"
          >
            <HiOutlineShoppingBag size={18} />
            Cart
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#C8F169] transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 border-t border-white/10 bg-[#0B3D2E]">
          <NavLink
            to="/"
            className={mobileLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <HiHome size={22} />
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={mobileLinkClass}
            onClick={() => setIsOpen(false)}
          >
            <GiTShirt size={22} />
            Products
          </NavLink>

          <Link
            to="/cart"
            onClick={() => setIsOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-[#C8F169] px-4 py-3 font-semibold text-[#0B3D2E] transition hover:bg-white"
          >
            <HiOutlineShoppingBag size={20} />
            View Cart
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;