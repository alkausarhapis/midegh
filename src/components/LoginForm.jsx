import React, { useState } from "react";
import { BiHide, BiLock, BiShow, BiUser } from "react-icons/bi";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPass] = useState(false);

  const toggleShowPassword = () => {
    setShowPass(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <p className="text-sm">WELCOME TO</p>
      <h1 className="mb-3 text-4xl font-bold text-primary">MIDEGH</h1>
      <div className="w-[60%] mb-10">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nam quam
        voluptatem quia labore rerum.
      </div>

      <form onSubmit="" className="w-[60%]">
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
            <BiLock className="text-xl" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
          />
          <span
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            {showPassword ? (
              <BiHide className="text-2xl" />
            ) : (
              <BiShow className="text-2xl" />
            )}
          </span>
        </div>

        <button className="p-2 bg-primary w-[100%] font-semibold text-white hover:opacity-85">
          Login
        </button>
        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <Link className="underline hover:opacity-60" to={`/register`}>
            Register now
          </Link>
        </p>
      </form>

      <p class="text-tertiary w-full text-center my-4 overflow-hidden before:h-[1.3px] after:h-[1.3px] after:bg-tertiary after:inline-block after:relative after:align-middle after:w-1/4 before:bg-tertiary before:inline-block before:relative before:align-middle before:w-1/4 before:right-2 after:left-2">
        or
      </p>

      <button className="flex items-center justify-center p-2 border border-gray-300 w-[60%] font-semibold text-gray-700 hover:bg-gray-100">
        <img
          src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Login with Google
      </button>
    </div>
  );
};

export default LoginForm;
