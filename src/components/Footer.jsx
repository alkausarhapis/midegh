import React from "react";
import logo from "../assets/whiteicon.png";
import {
  BiLogoFacebook,
  BiLogoGithub,
  BiLogoInstagramAlt,
  BiLogoTwitter,
} from "react-icons/bi";

const Footer = () => {
  return (
    <div>
      <div className="box-border flex flex-col items-center justify-center py-6 text-center text-slate-400 bg-slate-900">
        <img src={logo} alt="" className="w-40 mb-10 opacity-60" />
        <ul className="flex gap-16">
          <li>
            <a href="">Join Us</a>
          </li>
          <li>
            <a href="">Demo</a>
          </li>
          <li>
            <a href="">Github</a>
          </li>
          <li>
            <a href="">Credit</a>
          </li>
        </ul>
      </div>

      <div className="font-medium px-14 text-slate-500 bg-slate-900">
        <div className="flex justify-between w-full py-4 border-t border-slate-500 ">
          <p>Copyright &copy;2024 Midegh all rights reserved</p>
          <ul className="flex gap-5 text-2xl">
            <li>
              <a href="">
                <BiLogoInstagramAlt />
              </a>
            </li>
            <li>
              <a href="">
                <BiLogoGithub />
              </a>
            </li>
            <li>
              <a href="">
                <BiLogoTwitter />
              </a>
            </li>
            <li>
              <a href="">
                <BiLogoFacebook />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
