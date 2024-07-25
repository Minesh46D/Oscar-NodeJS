import { GET } from "../type"

const initialState = {
    data: []
}

export const crudReducer = (state = initialState, action) => {
    switch(action.type){
        case GET:
            return {data: [...action?.data]};
        default:
            return state
    }
}