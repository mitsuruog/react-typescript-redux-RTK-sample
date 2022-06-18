import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";

import { useGetUserQuery } from "../shared/hooks";
import { AppRoute } from "./AppRoute";
import { Header } from "./partials";

import "react-toastify/dist/ReactToastify.css";

const toastContextClass = {
  success: "bg-green-600",
  error: "bg-red-600",
  info: "bg-blue-600",
  warning: "bg-orange-400",
  default: "bg-indigo-600",
  dark: "bg-white-600 font-gray-300",
};

export const App = () => {
  const { isUninitialized } = useGetUserQuery();

  return isUninitialized ? (
    <div>loading</div>
  ) : (
    <div className="flex flex-col h-screen w-screen bg-slate-50">
      <Header />
      <main className="flex flex-grow self-center container bg-white">
        <nav className="flex flex-col items-end shrink-0 py-4 w-1/5 border-r">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "p-2 border-r-4 border-r-blue-700 hover:bg-slate-100"
                : "p-2 border-r-4 border-transparent hover:bg-slate-100"
            }
          >
            Top
          </NavLink>
        </nav>
        <section className="flex flex-col flex-grow p-4 w-4/5">
          <AppRoute />
        </section>
      </main>
      <ToastContainer
        className="flex flex-col gap-2"
        toastClassName={(context) =>
          classnames(
            "flex p-2 min-h-10 rounded justify-between overflow-hidden cursor-pointer",
            { [`${toastContextClass[context?.type ?? "default"]}`]: true }
          )
        }
        bodyClassName={() => "flex gap-2 text-sm font-white p-2"}
        closeButton={false}
        hideProgressBar={true}
      />
    </div>
  );
};
