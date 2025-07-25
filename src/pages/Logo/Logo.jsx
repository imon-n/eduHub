import React from 'react';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router'; // ✅ Correct import

const Logo = () => {
  return (
    <Link to="/" className="flex items-center space-x-2 mb-8">
      <img
        src={logo}
        alt="ProFast Logo"
        className="w-8 md:w-10 lg:w-12 object-contain"
      />
      <span className="text-lg md:text-xl lg:text-2xl font-extrabold">
        StudyHub
      </span>
    </Link>
  );
};

export default Logo;
