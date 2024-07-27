import React from "react";
import { BiLogoTrello } from "react-icons/bi";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-screen px-24 py-4 text-lg">
      <div className="flex items-center">
        <BiLogoTrello className="text-4xl text-primary" />
        <h1 className="text-3xl font-bold text-primary">MIDEGH</h1>
      </div>

      <ul className="flex justify-around gap-8 mr-4">
        <li>
          <a
            className="box-border py-3 border-b-2 hover:text-secondary"
            href="#about"
          >
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

      <div className="flex items-center gap-4">
        <Link
          to={`/login`}
          className="px-5 py-1 border-2 rounded-md border-opacity-30 text-primary border-primary hover:border-opacity-100"
        >
          Login
        </Link>
        <Link
          to={`/register`}
          className="px-6 py-1 text-lg text-white border-2 rounded-md bg-primary border-primary hover:opacity-80"
        >
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
