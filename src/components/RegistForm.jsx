import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { BiEnvelope, BiHide, BiLock, BiShow, BiUser } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const RegistForm = () => {
  const [showPassword, setShowPass] = useState(false);
  const [showConfirmPassword, setShowConfirmPass] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [passMatch, setPassMatch] = useState(true);

  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPass(!showPassword);
  };

  const toggleShowConfirmPass = () => setShowConfirmPass(!showConfirmPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password != conPassword) {
        setPassMatch(false);
        return;
      } else {
        setPassMatch(true);
      }

      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          username: username,
          role: "user",
        });
      }
      // popup berhasil didaftarkan dengan toastify
      toast.success("User registered successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        progress: undefined,
      });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      toast.error("This email already registered!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen select-none">
      <h1 className="text-4xl font-bold">Create Account</h1>
      <p className="mb-8 text-tertiary">Register to start your trip</p>

      <form onSubmit={handleRegister} className="w-[60%]">
        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiEnvelope className="text-xl" />
          </span>
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full p-2 pl-10 border-2 rounded-sm outline-none placeholder:text-tertiary"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative mb-4 text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiUser className="text-xl" />
          </span>
          <input
            type="text"
            placeholder="Username"
            required
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
            className={
              passMatch
                ? "w-full p-2 pl-10 border-2 rounded-sm outline-none pr-14 placeholder:text-tertiary"
                : "w-full p-2 pl-10 border-2 rounded-sm border-red-500 outline-none pr-14 placeholder:text-tertiary"
            }
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

        <div className="relative text-tertiary border-tertiary focus-within:text-secondary focus-within:border-secondary">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <BiLock className="text-xl" />
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            required
            className={
              passMatch
                ? "w-full p-2 pl-10 border-2 rounded-sm outline-none pr-14 placeholder:text-tertiary"
                : "w-full p-2 pl-10 border-2 rounded-sm border-red-500 outline-none pr-14 placeholder:text-tertiary"
            }
            onChange={(e) => setConPassword(e.target.value)}
          />
          <span
            onClick={toggleShowConfirmPass}
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
          >
            {showConfirmPassword ? (
              <BiHide className="text-2xl" />
            ) : (
              <BiShow className="text-2xl" />
            )}
          </span>
        </div>

        {passMatch ? (
          <br />
        ) : (
          <small className="w-full text-left text-red-500">
            Pasword are not matching
          </small>
        )}

        <button className="mt-3 p-2 bg-primary w-[100%] font-semibold text-white hover:opacity-85">
          Register
        </button>
        <p className="mt-3 text-sm text-center">
          Already have an account?{" "}
          <Link className="underline hover:opacity-60" to={`/login`}>
            Login here
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

export default RegistForm;
