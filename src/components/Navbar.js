import React from "react";
import { NavLink } from "react-router-dom";

// Assets
import Logo from "../assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white border-b fixed top-0 w-full z-10 shadow-sm">
      <div className="max-w-full mx-auto flex justify-between items-center p-7">
        <NavLink to="/dashboard" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-5 h-5 mr-3" />
          <span className="text-base font-semibold text-black">SIMS PPOB</span>
        </NavLink>
        <div className="flex space-x-4">
          <NavLink
            to="/topup"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
            }
          >
            Top Up
          </NavLink>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
            }
          >
            Transaction
          </NavLink>
          <NavLink
            to="/akun"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "text-gray-700 hover:text-red-500"
            }
          >
            Akun
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
