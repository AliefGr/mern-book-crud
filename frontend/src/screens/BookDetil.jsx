import React from "react";
import { createPortal } from "react-dom";
import CreateModal from "../components/CreateModal";
import { useDispatch, useSelector } from "react-redux";
import { editOpen } from "../slices/modalSlice";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBookDetilQuery,
} from "../slices/bookApiSlice";
import { toast } from "react-toastify";

export const BookDetil = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const edit = useSelector((state) => state.modal.edit);
  const dispatch = useDispatch();

  // Fetch book details
  const { data, isFetching, error } = useGetBookDetilQuery(id);

  // Mutation for deleting a book
  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async () => {
    try {
      await deleteBook(id).unwrap();
      toast.success("Book Deleted Successfully", { theme: "dark" });
      navigate("/");
    } catch (error) {
      toast.error("Book Failed Deleted", { theme: "dark" });
      console.error(error);
    }
  };

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Unable to fetch book details.</div>;
  }

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      {edit &&
        createPortal(
          <CreateModal edit={true} dataBook={data} />,
          document.body
        )}
      <div className="container px-5 py-36 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={data?.url}
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {data?.title}
            </h1>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {data?.category}
            </h2>
            <div className="flex mb-4">
              <span className="flex items-center">
                <span className="text-gray-600 ml-3">{data?.author}</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                {data?.publishYear}
              </span>
            </div>
            <p className="leading-relaxed">{data?.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(editOpen())}
                className="flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
