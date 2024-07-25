import { MINUS, PLUS } from "../Type"

export const plusData = () => {
    return (dispatch) => {
        dispatch({type: PLUS})
    }
}

export const minusData = () => {
    return (dispatch) => {
        dispatch({type: MINUS})
    }
}