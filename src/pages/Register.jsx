import React from "react";
import bg from "../assets/bgLogin.jpg";
import RegistForm from "../components/RegistForm";

const Register = () => {
  return (
    <div className="flex h-screen">
      <div className="flex items-center justify-center w-[36%]">
        <RegistForm />
      </div>
      <div className="relative w-[64%]">
        <img src={bg} alt="Background" className="object-cover w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <img src="icon.svg" alt="logo" className="relative z-10 w-1/4" />
        </div>
      </div>
    </div>
  );
};

export default Register;
