import React, { useState } from "react";
import { BiHide, BiLock, BiShow, BiUser } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = () => {
  const [showPassword, setShowPass] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const toggleShowPassword = () => {
    setShowPass(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let email = username;

      if (!username.includes("@")) {
        const q = query(
          collection(db, "Users"),
          where("username", "==", username)
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0];
          email = userDoc.data().email;
        }
      }

      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        progress: undefined,
      });
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 2000);
    } catch {
      toast.error("Username or password wrong", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: false,
        hideProgressBar: false,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen text-center select-none">
      <h1 className="text-4xl font-bold">Welcome Back!</h1>
      <p className="mb-8 text-tertiary">Continue your trip, by logging in</p>

      <form onSubmit={handleLogin} className="w-[60%]">
        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiUser className="text-xl" />
          </span>
          <input
            type="text"
            required
            placeholder="Email/Username"
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiLock className="text-xl" />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
            onChange={(e) => setPassword(e.target.value)}
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

      <p className="text-tertiary w-full text-center my-4 overflow-hidden before:h-[1.3px] after:h-[1.3px] after:bg-tertiary after:inline-block after:relative after:align-middle after:w-1/4 before:bg-tertiary before:inline-block before:relative before:align-middle before:w-1/4 before:right-2 after:left-2">
        or
      </p>

      <button className="flex items-center justify-center p-2 border border-gray-300 w-[60%] font-semibold text-gray-700 hover:bg-gray-100">
        <img
          src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Continue with Google
      </button>

      <ToastContainer />
    </div>
  );
};

export default LoginForm;
