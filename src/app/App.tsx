import React from "react";
import { NavLink } from "react-router-dom";

import { AppRoute } from "./AppRoute";
import { Header } from "./partials";

export const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-slate-50">
      <Header />
      <main className="flex flex-grow self-center container bg-white">
        <nav className="flex flex-col items-end shrink-0 py-4 w-1/5 border-r">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "p-2 border-r-4 border-r-blue-700 hover:bg-slate-100"
                : "p-2 hover:bg-slate-100"
            }
          >
            Top
          </NavLink>
        </nav>
        <section className="flex flex-col flex-grow p-4 w-4/5">
          <AppRoute />
        </section>
      </main>
    </div>
  );
};
