import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import icon from "../assets/navicon.png";
import { BiHeartCircle, BiSolidUserCircle } from "react-icons/bi";

const Navuser = () => {
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

  return (
    <nav className="fixed left-0 right-0 z-30 flex items-center justify-between py-2 text-lg shadow-md px-14">
      <img src={icon} alt="" className="w-40 mr-2" />
      <div className="flex items-center gap-2">
        <BiHeartCircle className="text-5xl" />

        <div className="relative" ref={dropdownRef}>
          <BiSolidUserCircle
            className="text-5xl text-gray-600 cursor-pointer hover:opacity-70"
            onClick={() => setDropdown(!dropdown)}
          />

          {dropdown && (
            <div className="absolute right-0 z-20 w-64 mt-2 bg-white border rounded-md border-tertiary">
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
    </nav>
  );
};

export default Navuser;
