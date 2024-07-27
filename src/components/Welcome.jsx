import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="flex items-center justify-between w-full h-[calc(100vh-100px)] px-24">
      <div className="flex flex-col w-1/2 gap-10">
        <h1 className="text-6xl font-bold capitalize">
          Discover <span className="text-primary">places</span> through the
          stories of fellow <span className="text-highlight">Travellers</span>
        </h1>
        <p className="text-justify w-[90%] text-paragraph">
          Discover and share authentic travel experiences with our
          community-driven guide. Find detailed information, ratings, and
          inspiring blogs from fellow travelers to make your next journey
          unforgettable.
        </p>
        <Link
          to={`/register`}
          className="w-[40%] text-center font-bold text-xl py-3 text-white border-2 rounded-md bg-primary hover:opacity-80"
        >
          Join us now!
        </Link>
      </div>

      <div className="grid grid-cols-2 grid-rows-3 gap-3 h-[60vh] w-1/2">
        <div className="row-span-3">
          <img
            src="https://picsum.photos/seed/mountain/400/600"
            alt="Lake"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="col-start-2 row-span-2 row-start-2">
          <img
            src="https://picsum.photos/seed/sea/400/600"
            alt="City"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
        <div className="col-start-2 row-start-1">
          <img
            src="https://picsum.photos/seed/hill/400/600"
            alt="Mountain"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;
