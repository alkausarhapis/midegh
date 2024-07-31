import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import landscape1 from "../assets/citylandscape.jpg";
import landscape2 from "../assets/mtlandscape.jpg";
import potrait1 from "../assets/islandpotrait.jpg";
import potrait2 from "../assets/lakepotrait.jpg";
import {
  BiSolidChat,
  BiSolidCheckShield,
  BiSolidFilePlus,
} from "react-icons/bi";
import Footer from "../components/Footer";
import Popular from "../components/Popular";

const LandingPage = () => {
  return (
    <div>
      <Navbar />

      {/* welcome */}
      <section
        id="welcome"
        className="flex items-center justify-between h-[calc(100vh-80px)] px-14"
      >
        <div className="flex flex-col w-1/2 gap-10 ">
          <h1 className="font-bold capitalize text-7xl">
            Discover <span className="text-primary">places</span> through the
            stories of fellow{" "}
            <span className="relative inline-block before:block before:absolute before:-inset-0 before:-skew-y-1 before:bg-highlight">
              <span className="relative text-white">travellers.</span>
            </span>
          </h1>
          <p className="text-justify w-[80%] text-paragraph">
            Discover and share authentic travel experiences with our
            community-driven guide. Find detailed information, ratings, and
            inspiring blogs from fellow travelers to make your next journey
            unforgettable.
          </p>
          <Link
            to={`/register`}
            className="w-[40%] text-center text-xl py-3 font-semibold border-2 rounded-lg px-7 text-primary border-primary hover:text-white hover:bg-primary hover:border-primary"
          >
            Begin your journey now!
          </Link>
        </div>

        <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[85vh] w-1/2">
          <div className="row-span-2">
            <img
              src={potrait1}
              alt=""
              className="object-cover object-center w-full h-full rounded-md"
            />
          </div>
          <div className="col-start-1 row-start-3">
            <img
              src={landscape1}
              alt=""
              className="object-cover object-center w-full h-full rounded-md"
            />
          </div>
          <div className="col-start-2 row-start-1">
            <img
              src={potrait2}
              alt=""
              className="object-cover object-center w-full h-full rounded-md"
            />
          </div>
          <div className="col-start-2 row-span-2 row-start-2">
            <img
              src={landscape2}
              alt=""
              className="object-cover object-center w-full h-full rounded-md"
            />
          </div>
        </div>
      </section>

      {/* features */}
      <section id="features" className="py-7 px-14">
        <div className="container w-[60%] text-center mb-10">
          <h3 className="text-xl text-highlight">
            Lorem ipsum dolor sit amet.
          </h3>
          <h2 className="mb-3 text-5xl font-semibold">
            Lorem ipsum dolor sit amet consectetur{" "}
            <span className="text-primary">adipisicing </span>
            Vero accusamus rem dicta maiores.
          </h2>
          <p className="px-16 text-paragraph">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur
            voluptate modi veritatis beatae. Laborum sed asperiores repudiandae
            quas illum nostrum Aspernatur, asperiores.
          </p>
        </div>

        <div className="grid grid-cols-3 grid-rows-1 gap-8">
          <div className="flex flex-col items-center justify-center p-5 text-center rounded-xl shadow-cust">
            <div className="mb-5">
              <BiSolidCheckShield className="p-3 text-white text-8xl bg-primary rounded-xl" />
            </div>
            <h3 className="text-2xl font-bold">Lorem ipsum dolor sit.</h3>
            <p className="text-paragraph">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              nobis possimus molestiae harum nihil! Incidunt, deserunt ducimus!
              Minus, mollitia eius!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 text-center rounded-xl shadow-cust">
            <div className="mb-5">
              <BiSolidFilePlus className="p-3 text-white text-8xl bg-primary rounded-xl" />
            </div>
            <h3 className="text-2xl font-bold">Lorem ipsum dolor sit.</h3>
            <p className="text-paragraph">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              nobis possimus molestiae harum nihil! Incidunt, deserunt ducimus!
              Minus, mollitia eius!
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 text-center rounded-xl shadow-cust">
            <div className="mb-5">
              <BiSolidChat className="p-3 text-white text-8xl bg-primary rounded-xl" />
            </div>
            <h3 className="text-2xl font-bold">Lorem ipsum dolor sit.</h3>
            <p className="text-paragraph">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ullam
              nobis possimus molestiae harum nihil! Incidunt, deserunt ducimus!
              Minus, mollitia eius!
            </p>
          </div>
        </div>
        {/* 
      features :
      - favorite and legit check
      - blogs
      - community
    */}
      </section>

      {/* Regist */}
      <section id="registAd" className="py-10 px-52">
        <div className="w-full p-10 rounded-xl bg-sky-100">
          <h2 className="text-5xl font-medium">
            Lorem ipsum dolor sit amet consectetur?
          </h2>
          <p className="text-paragraph w-[70%] my-9">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            eligendi aspernatur excepturi tempore iusto recusandae laudantium
            exercitationem ullam Incidunt, earum! Maiores veritatis inventore
            dolorem.
          </p>
          <Link
            to={`/register`}
            className="py-3 font-semibold border-2 rounded-lg px-7 text-primary border-primary hover:text-white hover:bg-primary hover:border-primary"
          >
            Join us now
          </Link>
        </div>
      </section>

      <Popular />

      <Footer />
    </div>
  );
};

export default LandingPage;
