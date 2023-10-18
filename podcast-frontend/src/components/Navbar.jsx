import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-semibold hover:underline"
        >
          Podcasts
        </Link>
        <div className="space-x-4">
          <Link to="/new" className="text-white hover:underline">
            New Podcast
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
