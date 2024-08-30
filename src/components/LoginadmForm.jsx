import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { BiSolidLock, BiUser } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

const LoginadmForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let email = username;

      // if using username select the data based on it
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
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container w-2/5 p-10 text-center bg-white rounded-lg shadow-cust">
      <h1 className="mb-6 text-3xl font-bold">Login Admin</h1>

      <form onSubmit={handleLogin} className="container">
        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiUser className="text-xl" />
          </span>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
