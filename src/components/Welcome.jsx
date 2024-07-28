import React from "react";
import { Link } from "react-router-dom";
import landscape1 from "../assets/citylandscape.jpg";
import landscape2 from "../assets/mtlandscape.jpg";
import potrait1 from "../assets/islandpotrait.jpg";
import potrait2 from "../assets/lakepotrait.jpg";

const Welcome = () => {
  return (
    <div className="flex items-center justify-between h-[calc(100vh-80px)] px-24">
      <div className="flex flex-col w-1/2 gap-10 ">
        <h1 className="font-bold capitalize text-7xl">
          Discover <span className="text-primary">places</span> through the
          stories of fellow <span className="text-highlight">Travellers</span>
        </h1>
        <p className="text-justify w-[80%] text-paragraph">
          Discover and share authentic travel experiences with our
          community-driven guide. Find detailed information, ratings, and
          inspiring blogs from fellow travelers to make your next journey
          unforgettable.
        </p>
        <Link
          to={`/register`}
          className="w-[40%] text-center font-bold text-xl py-3 text-white border-2 rounded-md bg-primary hover:opacity-80 "
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
    </div>
  );
};

export default Welcome;
