import { MINUS, PLUS } from "../Type"

const initialState = {
    count: 0
}

const countReducer = (state = initialState, action) => {
    switch(action.type){
        case PLUS:
            return { count: state.count + 1 }
        case MINUS:
            return { count: state.count - 1 }
        default:
            return state
    }
}

export default countReducer