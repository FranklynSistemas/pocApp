import React from "react";
import { Link } from "react-router-dom";

export const NavBar = ({ active = "home" }) => {
  return (
    <div>
      <section
        id="bottom-navigation"
        className="block fixed inset-x-0 bottom-0 z-10 bg-white shadow"
      >
        <div id="tabs" className="flex justify-between">
          <Link
            to="/"
            className={`${
              active === "home" ? "bg-red-50" : ""
            } cursor-pointer text-gray-500 w-full focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mb-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="tab tab-home block text-xs">Home</span>
          </Link>
          <Link
            to="/favorites"
            className={`${
              active === "favorite" ? "bg-red-50" : ""
            } cursor-pointer w-full text-red-400 focus:text-teal-500 hover:text-teal-500 justify-center inline-block text-center pt-2 pb-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block mb-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="tab tab-home block text-xs">Favorite</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
