import { configureStore } from "@reduxjs/toolkit";
import { modalReducers } from "./modalSlice";
import { apiSlice } from "./apiSlice";
import { bookReducers } from "./booksSlice";

const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        modal : modalReducers,
        books : bookReducers
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

export default store