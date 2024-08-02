import React from "react";
import { BiSolidLock, BiUser } from "react-icons/bi";

const LoginadmForm = () => {
  return (
    <div className="container w-2/5 p-10 text-center bg-white rounded-lg shadow-cust">
      <h1 className="mb-6 text-3xl font-bold">Login Admin</h1>

      <form action="" className="container">
        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiUser className="text-xl" />
          </span>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
          />
        </div>
        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiSolidLock className="text-xl" />
          </span>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
          />
        </div>

        <button className="w-full p-2 text-xl font-semibold text-white bg-primary hover:opacity-70">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginadmForm;
