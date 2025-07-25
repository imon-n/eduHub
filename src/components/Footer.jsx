import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router";
import { IoLogoLinkedin, IoLogoYoutube } from "react-icons/io5";
import logo from "../assets/images/logo.png";

const Footer = () => {

  const links = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/events">Events</Link>
      </li>
    </>
  );


  return (
    <footer className="footer bg-[#96ac35] text-white mt-10 -mb-96 pt-6 pb-0 flex flex-col justify-center text-center w-full items-center space-y-1">
      <div className="flex items-center justify-center gap-2">
        <img
          className="w-12 rounded-full"
          src={logo}
          alt="Low.BD Logo"
        />
        <span className="text-2xl font-bold">Study Zone</span>
      </div>

      {/*  Links */}
      <ul className="flex flex-col sm:flex-row text-center space-x-3 -my-7 text-md font-semibold text-white">
        {links}
      </ul>

      {/* Social Icons */}
      <div className="flex gap-4 mt-4 sm:mt-0">
        <a
          className="link link-hover"
          href="https://www.facebook.com/mdimon.imon.18"
          target="_blank"
        >
          <FaFacebook size={25} />
        </a>
        <a
          className="link link-hover"
          href="https://www.linkedin.com/in/nur-mohammad-imon-29a2b4255/"
          target="_blank"
        >
          <IoLogoLinkedin size={25} />
        </a>
        <a
          className="link link-hover"
          href="https://www.youtube.com/"
          target="_blank"
        >
          <IoLogoYoutube size={25} />
        </a>
      </div>
      <div className="text-center text-sm pb-3">
        © 2025 StydyZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;