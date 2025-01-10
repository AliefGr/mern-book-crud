import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name : 'book',
    initialState : {
        books : [],
        page : 1
    },
    reducers : {
        setBooks(state, action){
            state.books = [...state.books, ...action.payload]
        },
        clearBooks(state,action){
            state.books = []
        },
        setPage(state, action){
            state.page += 1;
        }
    }
})

export const {setBooks, clearBooks, setPage} = bookSlice.actions
export const bookReducers = bookSlice.reducer