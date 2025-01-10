import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addClose, editClose } from "../slices/modalSlice";
import {
  useCreateBookMutation,
  useEditBookMutation,
} from "../slices/bookApiSlice";
import { toast } from "react-toastify";
import { use } from "react";

const CreateModal = ({ edit, dataBook }) => {
  const dispatch = useDispatch();
  const initialState = {
    title: "",
    author: "",
    url: "",
    category: "",
    description: "",
    publishYear: null,
  };
  const [editBook] = useEditBookMutation();
  const [createBook] = useCreateBookMutation();
  const [data, setData] = useState(initialState);
  const { title, author, category, description, publishYear, url } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data);
    try {
      if (edit) {
        const book = await editBook(data).unwrap();
        dispatch(editClose());
        // console.log(book);
        toast.success("Book updated successfully", {
          theme: "dark",
        });
      } else {
        const book = await createBook(data).unwrap();
        dispatch(addClose());
        toast.success("Book Created successfully", {
          theme: "dark",
        });
        // console.log(book);
      }
    } catch (error) {
      if (edit) {
        dispatch(editClose());
        toast.error("Book Failed  Edited", {
          theme: "dark",
        });
      } else {
        dispatch(addClose());
        toast.error("Book Failed  Created", {
          theme: "dark",
        });
      }
      console.log(error);
    }
    setData(initialState);
  };

  useEffect(() => {
    if (edit) {
      setData(dataBook);
    }
  }, []);
  return (
    <div>
      <div
        onClick={(e) => {
          if (e.target.id === "crud-modal") {
            dispatch(addClose());
            dispatch(editClose());
          }
        }}
        id="crud-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="flex bg-modal-color overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {edit ? "Edit Book" : "Create Book"}
              </h3>
              <button
                onClick={() => {
                  dispatch(addClose());
                  dispatch(editClose());
                }}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5">
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title Book
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Title Book"
                    required
                    value={title}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="author"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Author Book
                  </label>
                  <input
                    type="text"
                    name="author"
                    id="author"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Author Book"
                    required=""
                    value={author}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Book Cover
                  </label>
                  <input
                    type="text"
                    name="url"
                    id="url"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Book Cover"
                    required=""
                    value={url}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="publishYear"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Publish Year
                  </label>
                  <input
                    type="number"
                    name="publishYear"
                    id="publishYear"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Publish Year"
                    required=""
                    value={publishYear}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    defaultValue="option1"
                    name="category"
                    id="category"
                    value={category}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option value="option1">Select category</option>
                    <option value="Religious">Religious</option>
                    <option value="Romance">Romance</option>
                    <option value="Technology">Technology</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Book Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                    value={description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {edit ? "Save" : "Create"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
