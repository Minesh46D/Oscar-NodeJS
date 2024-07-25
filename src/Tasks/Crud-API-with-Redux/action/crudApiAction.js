import axios from "axios"
import { GET } from "../type"

export const getData = () => {
    return (dispatch) => {
        axios.get('https://student-api.mycodelibraries.com/api/user/get').then((res) => {
            dispatch({type: GET, data: res.data.data})
        }).catch((err) => console.log(err))
    }
}

export const postData = (obj) => {
    return (dispatch) => {
        let form = new FormData()
        form.append('firstName', obj.firstName)
        form.append('lastName', obj.lastName)
        form.append('age', obj.age)
        form.append('hobbies', obj.hobbies)
        form.append('gender', obj.gender)
        form.append('city', obj.city)
        form.append('userImage', obj.image)

        axios.post('https://student-api.mycodelibraries.com/api/user/add', form).then((res) => {
            dispatch(getData())
        }).catch((err) => console.log(err))
    }
}

export const deleteData = (id) => {
    return(dispatch) => {
        axios.delete(`https://student-api.mycodelibraries.com/api/user/delete?id=${id}`).then((res) => {
            console.log(res)
            dispatch(getData())
        }).catch((err) => console.log(err))
    }
}

export const updateData = (obj) => {
    return(dispatch) => {
        let form = new FormData()
        form.append('id', obj._id)
        form.append('firstName', obj.firstName)
        form.append('lastName', obj.lastName)
        form.append('age', obj.age)
        form.append('hobbies', obj.hobbies)
        form.append('gender', obj.gender)
        form.append('city', obj.city)
        form.append('userImage', obj.image)

        axios.post('https://student-api.mycodelibraries.com/api/user/update', form).then((res) => {
            dispatch(getData())
        }).catch((err) => console.log(err))
    }
}