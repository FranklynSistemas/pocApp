import React, { useContext } from "react";
import { PokemonList } from "./PokemonList";
import { Login } from "./Login";
import { NavBar } from "./NavBar";

import { GlobalContext } from '../context/GlobalState';

export const Home = () => {
  const { user } = useContext(GlobalContext);
  
  return user ? (
    <React.Fragment>
      <div className="container mx-auto">
        <h3 className="text-center text-3xl mt-10 mb-10 text-base leading-8 text-black font-bold tracking-wide uppercase">
          Pokemon App
        </h3>
        {/* <Heading /> */}
        <PokemonList />
        <NavBar active={'home'} />
      </div>
    </React.Fragment>
  ) : <Login />;
};
