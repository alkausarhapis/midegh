import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/navicon.png";
import { BiHeartCircle, BiSolidCog, BiSolidUserCircle } from "react-icons/bi";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useAuth } from "../hooks/useAuth";

const Navuser = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { userData } = useAuth();

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

  const logout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="fixed left-0 right-0 z-30 flex items-center justify-between py-2 text-lg bg-white shadow-md px-14">
      <Link to={`/home`}>
        <img src={icon} alt="" className="w-40 mr-2" />
      </Link>
      <div className="flex items-center gap-2">
        <Link className="hover:opacity-80" to={`/list`}>
          <BiHeartCircle className="text-4xl" />
        </Link>

        <Link className="hover:opacity-80" to={`/guide`}>
          <BiSolidCog className="text-4xl" />
        </Link>

        <div className="relative" ref={dropdownRef}>
          <BiSolidUserCircle
            className="text-5xl text-gray-600 cursor-pointer hover:opacity-70"
            onClick={() => setDropdown(!dropdown)}
          />

          {dropdown && (
            <div className="absolute right-0 z-20 w-64 mt-2 bg-white border rounded-md border-tertiary">
              <ul>
                <li className="px-3 pt-3">{userData.username}</li>
                <li className="px-3 pb-3">{userData.email}</li>
                <hr className="border-black" />
                <li>
                  <span
                    onClick={logout}
                    className="block p-3 text-red-500 cursor-pointer hover:bg-gray-300"
                  >
                    Log out
                  </span>
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
