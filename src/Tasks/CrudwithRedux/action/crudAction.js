import { DELETE, GET, SUBMIT, UPDATE } from "../type"

export const getData = () => {
    console.log('get data')
    return (dispatch) => dispatch({type: GET})
}

export const submitData = (obj) => {
    console.log('submit data')
    return (dispatch) => dispatch({type: SUBMIT, obj: obj})
}

export const deleteData = (id) => {
    console.log('delete data')
    return (dispatch) => dispatch({type: DELETE, id:id})
}

export const updateData = (obj, editIndex) => {
    console.log('edit data')
    return(dispatch) => dispatch({type: UPDATE, obj: obj, editIndex: editIndex})
}