import React, { useEffect, useRef, useState } from "react";
import {
  BiSolidHome,
  BiSolidNotepad,
  BiSolidUserCircle,
  BiTable,
} from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import icon from "../assets/iconflat.svg";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useAuth } from "../hooks/useAuth";

const Sidebaradm = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { userData } = useAuth();

  const logout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

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
    <div className="box-border h-screen w-fit bg-secondary shadow-cust">
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div className="w-full">
          <div className="p-5">
            <Link to={`/admin`}>
              <img src={icon} alt="Logo" className="w-12" />
            </Link>
          </div>

          {/* pages dashboard
            home
            draft
            blog manager (bentuknya tabel isinya data lengkap terkait blognya)
          */}

          <ul className="flex flex-col items-center w-full mt-5">
            <Link className="w-full" to={`/admin`}>
              <li
                className={`w-full cursor-pointer flex justify-center items-center py-4 ${
                  pathname === "/admin" ? "bg-slate-600" : ""
                } hover:bg-slate-600`}
              >
                <BiSolidHome className="text-4xl text-white" />
              </li>
            </Link>

            <Link className="w-full" to={`/admin/data`}>
              <li
                className={`w-full cursor-pointer flex justify-center items-center py-4 ${
                  pathname === "/admin/data" ? "bg-slate-600" : ""
                } hover:bg-slate-600`}
              >
                <BiSolidNotepad className="text-4xl text-white" />
              </li>
            </Link>

            <Link className="w-full" to={`/`}>
              <li
                className={`w-full cursor-pointer flex justify-center items-center py-4 ${
                  pathname === "/" ? "bg-slate-600" : ""
                } hover:bg-slate-600`}
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
                <li className="px-3 pt-3">{userData.username}</li>
                <li className="px-3 pb-3">{userData.email}</li>
                <hr className="border-black" />
                <li>
                  <span
                    onClick={logout}
                    className="block p-3 text-red-500 hover:bg-gray-300"
                  >
                    Log out
                  </span>
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
