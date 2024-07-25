import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "./rootReducer";
import { thunk } from "redux-thunk";
import { configureStore, Tuple } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(thunk),
})