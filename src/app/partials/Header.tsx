import * as React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="flex justify-between item-center h-12 p-4 bg-slate-300">
      <div className="flex items-center">
        <NavLink to="/">Sample App</NavLink>
      </div>
      <div className="flex items-center">Sign In</div>
    </header>
  );
};
