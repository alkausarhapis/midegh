import React from "react";
import LoginForm from "../components/LoginForm";
import bg from "../assets/bgLogin.jpg";

const Login = () => {
  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-[36%]">
        <LoginForm />
      </div>
      <div className="w-[64%]">
        <img src={bg} alt="Background" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
