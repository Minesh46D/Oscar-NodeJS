import { DELETE, SUBMIT, UPDATE } from "../type"

const initialState = {
    data: []
}
export const crudReducer = (state = initialState, action) => {
    switch(action.type){
        case SUBMIT:;
            return {data: [...state.data, action.obj]}
        case DELETE:
            state.data.splice(action.id, 1);
            return {data: [...state.data]}
        case UPDATE:
            state.data.splice(action.editIndex, 1, action.obj)
            return {data: [...state.data]}
        default:
            return {data: state.data}
    }
}