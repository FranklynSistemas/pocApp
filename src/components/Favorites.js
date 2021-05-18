import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { NavBar } from "./NavBar";

import { GlobalContext } from "../context/GlobalState";

export const Favorites = () => {
  const { favoriteAction, favoritePokemon = {} } = useContext(GlobalContext);
  console.log("favoritePokemon", favoritePokemon);

  return (
    <div className="container mx-auto">
      <h3 className="text-center text-3xl mt-10 mb-10 text-base leading-8 text-black font-bold tracking-wide uppercase">
        My Favorites
      </h3>
      <React.Fragment>
        {favoritePokemon && Object.keys(favoritePokemon).length > 0 ? (
          <div className="w-full max-w-4xl mb-40 mx-auto">
            {Object.keys(favoritePokemon).map((key) => (
              <div
                className="flex items-center bg-gray-100 mb-5 shadow"
                key={favoritePokemon[key].url}
              >
                <div className="flex-auto text-left px-4 py-2 m-2">
                  <Link to={`/detail/${favoritePokemon[key].name}`}>
                    <p className="text-gray-900 leading-none">
                      {favoritePokemon[key].name}
                    </p>
                  </Link>
                </div>
                <div className="flex-auto text-right px-4 py-2 m-2">
                  <button
                    onClick={() =>
                      favoriteAction(
                        favoritePokemon[key].url,
                        favoritePokemon[key]
                      )
                    }
                    className="text-red-400 focus:outline-none block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-full inline-flex items-center"
                    title="Remove Employee"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill={
                        favoritePokemon[favoritePokemon[key].url]
                          ? "currentColor"
                          : "none"
                      }
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center bg-gray-100 text-gray-500 py-5">No data.</p>
        )}
      </React.Fragment>
      <NavBar active={"favorite"} />
    </div>
  );
};
