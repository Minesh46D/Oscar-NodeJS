import { combineReducers } from "redux";
import countReducer from "./countReducer";
import aryReducer from "./aryReducer";

export const rootReducer = combineReducers({
    count: countReducer,
    data: aryReducer
})