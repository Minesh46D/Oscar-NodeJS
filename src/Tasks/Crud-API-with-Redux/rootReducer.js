import { combineReducers } from "redux";
import { crudReducer } from "./reduce/crudReducer";

export const rootReducer = combineReducers({
    crudReducer: crudReducer
})