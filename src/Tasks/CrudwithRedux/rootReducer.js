import { combineReducers } from "redux";
import { crudReducer } from "./reducer/crudReducer";

export const rootReducer = combineReducers({
    crudReducer: crudReducer
})