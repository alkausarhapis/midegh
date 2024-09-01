import React from "react";
import Navuser from "../../components/Navuser";
import { BiSearch } from "react-icons/bi";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import Popular from "../../components/Popular";
import AllBlogs from "../../components/AllBlogs";

const Home = () => {
  return (
    <div>
      <Navuser />

      <section id="search" className="pt-24 px-14">
        <div className="container w-[60%] text-center mb-10">
          <h3 className="text-lg text-highlight">
            Lorem ipsum dolor sit amet.
          </h3>
          <h2 className="mb-3 text-5xl font-semibold">
            Lorem ipsum dolor sit amet consectetur?
          </h2>
          <p className="text-xl text-paragraph">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
            laudantium fuga cum esse, optio error est ad, neque expedita sunt
            dignissimos perferendis nesciunt ea labore illo, animi
            exercitationem commodi ab.
          </p>
        </div>

        <div className="container w-[65%] relative text-paragraph">
          <input
            type="text"
            placeholder="Where ya wanna go?"
            className="w-full px-10 py-5 pr-40 text-xl rounded-full outline-none text-secondary shadow-cust placeholder:text-paragraph"
          />
          <span className="absolute inset-y-0 right-0 flex items-center text-center rounded-full cursor-pointer hover:opacity-85 px-14 bg-primary pointer-events-nonez">
            <BiSearch className="text-4xl text-white " />
          </span>
        </div>
      </section>

      <section id="registAd" className="py-20 px-52">
        <div className="w-full p-10 text-center rounded-xl bg-sky-100">
          <h2 className="text-5xl font-medium">
            Lorem ipsum dolor sit amet consectetur
          </h2>
          <p className="text-paragraph w-[70%] container my-9">
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

      <AllBlogs />
      <Footer />
    </div>
  );
};

export default Home;
