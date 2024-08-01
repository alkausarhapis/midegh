import React from "react";
import Navuser from "../../components/Navuser";
import { BiSearch } from "react-icons/bi";

const Home = () => {
  return (
    <div>
      <Navuser />

      <section id="search" className="pt-24 px-14">
        <div className="container w-[60%] text-center mb-10">
          <h2 className="mb-3 text-5xl font-semibold">
            Lorem ipsum dolor sit amet consectetur?
          </h2>
        </div>

        <div className="container w-[65%] relative text-paragraph">
          <input
            type="text"
            placeholder="Where ya wanna go?"
            className="w-full px-10 py-5 pr-40 text-xl rounded-full outline-none shadow-cust placeholder:text-paragraph"
          />
          <span className="absolute inset-y-0 right-0 flex items-center text-center rounded-full cursor-pointer hover:opacity-85 px-14 bg-primary pointer-events-nonez">
            <BiSearch className="text-4xl text-white " />
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;
