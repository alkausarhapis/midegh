import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import icon from "../assets/iconflat.svg";
import {
  BiSolidBarChartSquare,
  BiSolidData,
  BiSolidHome,
  BiSolidUserCircle,
} from "react-icons/bi";

const Sidebaradm = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  //  handleclick outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const { pathname } = useLocation();

  return (
    <div className="box-border h-full rounded-xl w-fit bg-primary shadow-cust">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="w-full">
          <div className="p-4">
            <Link to={`/admin`}>
              <img src={icon} alt="" className="w-12" />
            </Link>
          </div>

          <ul className="mt-5">
            <Link to={`/admin`}>
              <li
                className={`p-4 cursor-pointer hover:opacity-70 ${
                  pathname === "/admin" ? "bg-cyan-600" : ""
                }`}
              >
                <BiSolidHome className="text-5xl text-white" />
              </li>
            </Link>

            <Link to={`/admin/data`}>
              <li
                className={`p-4 cursor-pointer hover:opacity-70 ${
                  pathname === "/admin/data" ? "bg-cyan-600" : ""
                }`}
              >
                <BiSolidData className="text-5xl text-white" />
              </li>
            </Link>

            <Link to={``}>
              <li
                className={`p-4 cursor-pointer hover:opacity-70 ${
                  pathname === "" ? "bg-cyan-600" : ""
                }`}
              >
                <BiSolidBarChartSquare className="text-5xl text-white" />
              </li>
            </Link>
          </ul>
        </div>

        <div className="relative p-4" ref={dropdownRef}>
          <BiSolidUserCircle
            className="text-5xl text-white cursor-pointer hover:opacity-70"
            onClick={() => setDropdown(!dropdown)}
          />

          {dropdown && (
            <div className="absolute top-0 z-20 w-64 mt-[-4rem] bg-white border rounded-md left-20 border-tertiary">
              <ul>
                <li className="px-3 pt-3">Username</li>
                <li className="px-3 pb-3">email@email.com</li>
                <hr className="border-black" />
                <li>
                  <Link className="block p-3 text-red-500 hover:bg-gray-300">
                    Log out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebaradm;
