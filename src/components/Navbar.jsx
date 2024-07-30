import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/navicon.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-2 text-lg px-14 max-w-screen">
      <img src={icon} alt="" className="mr-2 w-44" />
      <div className="flex items-center gap-5">
        <Link to={`/login`} className="text-paragraph hover:opacity-75">
          Login
        </Link>
        <Link
          to={`/register`}
          className="px-6 py-1 text-lg text-white border-2 rounded-md shadow-md bg-primary border-primary hover:opacity-80 shadow-primary"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
