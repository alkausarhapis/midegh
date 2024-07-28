import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/navicon.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-screen px-24 py-3 text-lg">
      <img src={icon} alt="" className="mr-2 w-44" />

      <ul className="flex justify-around gap-8 mr-4">
        <li>
          <a className="text-tertiary hover:text-secondary" href="#about">
            About
          </a>
        </li>
        <li>
          <a className="hover:text-secondary text-tertiary" href="#popular">
            Popular
          </a>
        </li>
        <li>
          <a className="hover:text-secondary text-tertiary" href="#feature">
            Feature
          </a>
        </li>
      </ul>

      <div className="flex items-center gap-5">
        <Link to={`/login`} className="underline text-primary hover:opacity-75">
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
