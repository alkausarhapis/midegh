import React, { useEffect, useRef, useState } from "react";
import {
  BiSolidHome,
  BiSolidNotepad,
  BiSolidUserCircle,
  BiTable,
} from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import icon from "../assets/iconflat.svg";

const SidebarGuide = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
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
    <div className="box-border h-screen w-fit bg-primary shadow-cust">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="w-full">
          <div className="p-5">
            <Link to={`/guide`}>
              <img src={icon} alt="Logo" className="w-12" />
            </Link>
          </div>

          {/* pages dashboard
            home
            draft
            blog manager (bentuknya tabel isinya data lengkap terkait blognya)
          */}

          <ul className="flex flex-col items-center w-full mt-5">
            <Link className="w-full" to={`/guide`}>
              <li
                className={`w-full cursor-pointer flex justify-center items-center py-4 ${
                  pathname === "/guide" ? "bg-cyan-600" : ""
                } hover:bg-cyan-600`}
              >
                <BiSolidHome className="text-4xl text-white" />
              </li>
            </Link>

            <Link className="w-full" to={`/`}>
              <li
                className={`w-full cursor-pointer flex justify-center items-center py-4 ${
                  pathname === "/" ? "bg-cyan-600" : ""
                } hover:bg-cyan-600`}
              >
                <BiSolidNotepad className="text-4xl text-white" />
              </li>
            </Link>

            <Link className="w-full" to={`/`}>
              <li
                className={`w-full cursor-pointer flex justify-center items-center py-4 ${
                  pathname === "/" ? "bg-cyan-600" : ""
                } hover:bg-cyan-600`}
              >
                <BiTable className="text-4xl text-white" />
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

export default SidebarGuide;
