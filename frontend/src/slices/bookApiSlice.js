import { get } from "mongoose";
import { apiSlice } from "./apiSlice";
import { deleteBook } from "../../../backend/controlles/bookControlles";

const BOOKS_URL = "/api/books";

export const bookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookDetil: builder.query({
      providesTags: ["BOOKS"],
      query: (bookId) => {
        return {
          url: `${BOOKS_URL}/${bookId}`,
          method: "GET",
        };
      },
    }),
    createBook: builder.mutation({
      invalidatesTags: ["BOOKS"],
      query: (data) => {
        return {
          url: `${BOOKS_URL}`,
          method: "POST",
          body: data,
        };
      },
    }),
    editBook: builder.mutation({
      invalidatesTags: ["BOOKS"],
      query: (data) => {
        return {
          url: `${BOOKS_URL}/${data._id}`,
          method: "PUT",
          body: data,
        };
      },
    }),

    deleteBook: builder.mutation({
      invalidatesTags: ["BOOKS"],
      query: (bookId) => {
        return {
          url: `${BOOKS_URL}/${bookId}`,
          method: "DELETE",
        };
      },
    }),

    getBooks: builder.query({
      providesTags: ["BOOKS"],
      query: (params) => {
        const newParams = {
          limit: `${params.limit}`,
          page: `${params.page}`,
        };
        if (newParams.category) {
          newParams.category = params.category;
        }
        return {
          url: `${BOOKS_URL}`,
          method: get,
          params: newParams,
        };
      },
    }),
  }),
});

export const {
  useCreateBookMutation,
  useEditBookMutation,
  useGetBooksQuery,
  useLazyGetBooksQuery,
  useGetBookDetilQuery,
  useDeleteBookMutation
} = bookApiSlice;
