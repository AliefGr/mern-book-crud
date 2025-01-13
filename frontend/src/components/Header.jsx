import React from "react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import CreateModal from "./CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { addOpen } from "../slices/modalSlice";

const Header = ({ light, toggleLight }) => {
  const add = useSelector((state) => state.modal.add);
  const dispatch = useDispatch();
  return (
    <div className="bg-white border-b border-gray-200  z-10 dark:bg-zinc-900 fixed right-0 left-0 gap-3 flex items-center justify-center py-4 md:py-8 flex-wrap">
      <Link
        to="/"
        className="text-blue-700 hover:text-white border border-blue-600 bg-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
      >
        All categories
      </Link>
      <Link
        to="/education"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:text-white dark:focus:ring-gray-800"
      >
        Education
      </Link>
      <Link
        to="/religious"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:text-white dark:focus:ring-gray-800"
      >
        Religious
      </Link>
      <Link
        to="/romance"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:text-white dark:focus:ring-gray-800"
      >
        Romance
      </Link>
      <Link
        to="/technology"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:text-white dark:focus:ring-gray-800"
      >
        Technology
      </Link>
      <button
        onClick={() => dispatch(addOpen())}
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center dark:text-white dark:focus:ring-gray-800"
      >
        Add New Book
      </button>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value={light}
          onClick={toggleLight}
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          {light ? "Light" : "Dark"}
        </span>
      </label>
      {add && createPortal(<CreateModal />, document.body)}
    </div>
  );
};

export default Header;
