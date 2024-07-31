import React, { useState } from "react";
import cardimg1 from "../assets/hilllandscape.jpg";
import { Link } from "react-router-dom";
import { BiHeart, BiSolidCheckCircle } from "react-icons/bi";

const Popular = () => {
  const data = [
    {
      id: "5678efgh",
      judul: "Majestic Tokyo Nights",
      lokasi: "Tokyo, Japan",
      isi: "Tokyo is a city that blends modernity with tradition. Skyscrapers light up the night while temples offer a serene escape. A true metropolis that never sleeps, offering endless excitement and beauty.",
      rating: 3,
      foto: cardimg1,
    },
    {
      id: "9101ijkl",
      judul: "The Charm of Venice Canals",
      lokasi: "Venice, Italy",
      isi: "Venice is a city like no other, where streets are made of water and gondolas are the preferred mode of transport. The rich history and stunning architecture make it a must-visit destination.",
      rating: 4,
      foto: cardimg1,
    },
    {
      id: "1213mnop",
      judul: "Exploring the Great Wall",
      lokasi: "Beijing, China",
      isi: "The Great Wall of China is a marvel of ancient engineering. Stretching over 13,000 miles, it offers breathtaking views and a deep dive into the history and culture of China.",
      rating: 5,
      foto: cardimg1,
    },
    {
      id: "1415qrst",
      judul: "Safari Adventures in Kenya",
      lokasi: "Nairobi, Kenya",
      isi: "Kenya is a land of diverse wildlife and stunning landscapes. A safari here offers close encounters with lions, elephants, and giraffes in their natural habitat. A once-in-a-lifetime experience for nature lovers.",
      rating: 2,
      foto: cardimg1,
    },
    {
      id: "1617uvwx",
      judul: "The Magic of Santorini",
      lokasi: "Santorini, Greece",
      isi: "Santorini is famous for its white-washed buildings with blue domes, stunning sunsets, and crystal-clear waters. It's a romantic destination perfect for honeymooners and travelers seeking tranquility.",
      rating: 4,
      foto: cardimg1,
    },
    {
      id: "1819yzab",
      judul: "The Wilderness of Patagonia",
      lokasi: "Patagonia, Argentina",
      isi: "Patagonia offers rugged landscapes and a sense of adventure. From glaciers to mountain peaks, it's a paradise for hikers and outdoor enthusiasts looking to connect with nature on a grand scale.",
      rating: 1,
      foto: cardimg1,
    },
  ];

  const [itemsToShow, setItemsToShow] = useState(3);

  const loadMore = () => {
    setItemsToShow((prev) => prev + 3);
  };

  const foldBack = () => {
    setItemsToShow(3);
  };

  return (
    <div className="py-10 px-14">
      <h2 className="text-4xl font-semibold">Popular Blogs</h2>

      <div className="grid grid-cols-3 gap-10">
        {data.slice(0, itemsToShow).map((item) => (
          <Link
            key={item.id}
            id="card"
            className="relative mt-3 card-wrapper h-fit"
          >
            <div className="relative mb-1 h-60">
              <img
                src={item.foto}
                alt={item.judul}
                className="object-cover object-center w-full h-full mb-2 rounded-lg hover:opacity-80"
              />
              <div className="absolute z-10 p-2 text-center bg-white rounded-full shadow-cust top-2 right-2 w-fit">
                <BiHeart className="text-3xl" />
              </div>

              <div
                className={`absolute z-10 flex items-center justify-center gap-2 p-2 font-semibold text-white rounded-md bottom-2 left-2 shadow-cust ${
                  item.rating >= 4
                    ? "bg-primary"
                    : item.rating >= 3
                    ? "bg-secondary"
                    : "bg-highlight"
                }`}
              >
                <BiSolidCheckCircle className="text-2xl" />
                <span className="mr-2">
                  {item.rating >= 4
                    ? "Legit"
                    : item.rating >= 3
                    ? "Kinda legit"
                    : "Not Legit"}
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold">{item.judul}</h3>
            <p className="text-justify text-paragraph">{item.isi}</p>
          </Link>
        ))}
      </div>

      {itemsToShow < data.length ? (
        <div className="flex items-center justify-center w-full mt-3">
          <button
            onClick={loadMore}
            className="text-lg font-medium underline text-primary hover:opacity-80"
          >
            Load More
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full gap-2 mt-5">
          <button
            onClick={foldBack}
            className="text-lg font-medium underline text-primary hover:opacity-80"
          >
            See less
          </button>
          <Link className="text-lg font-medium underline text-paragraph hover:opacity-80">
            Register to see more
          </Link>
        </div>
      )}
    </div>
  );
};

export default Popular;
