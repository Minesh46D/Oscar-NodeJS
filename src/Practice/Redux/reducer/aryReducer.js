import { MINUS, PLUS } from "../Type"

const initialState = {
    data: [0,1,2,3,4,5]
}

const aryReducer = (state = initialState, action) => {
    let ary = [...state.data];
    console.log(state.data)
    switch(action.type){
        case PLUS:
            ary.push(state.data[state.data.length - 1] + 1 || 0);
            return {data: ary}
        case MINUS:
            ary.pop()
            return {data: ary}
        default:
            return state
    }
}

export default aryReducer