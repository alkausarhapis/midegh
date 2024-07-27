import React from "react";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Welcome />
      {/* 
      <section>About</section>
      <section>Most popular</section>
      <section>Feature</section>
      <section>Footer</section> */}
    </div>
  );
};

export default LandingPage;
