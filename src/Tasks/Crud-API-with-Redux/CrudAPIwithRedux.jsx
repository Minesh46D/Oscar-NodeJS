import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, getData, postData, updateData } from './action/crudApiAction';

const CrudAPIwithRedux = () => {
    const blankObj = {id: 0, firstName: '', lastName: '', age: '', hobbies: '', gender: '', city: '', image: ''}
    const [obj, setObj] = useState({id: 0, firstName: '', lastName: '', age: '', hobbies: '', gender: '', city: '', image: ''})
    const data = useSelector(state => state.crudReducer.data);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getData())
    }, [])
    
    const handleChange = (e) => {
        if(e.target.name == 'hobbies'){
            if(e.target.checked){
                obj.hobbies = [...obj.hobbies, e.target.value]
            }else{
                obj.hobbies = obj.hobbies.filter((x) => x != e.target.value)
            }
        }else if(e.target.type == 'file'){
            obj.image = e.target.files[0]
        }else{
            obj[e.target.name] = e.target.value;
        }
        
        setObj({...obj})
    }

    const saveData = () => {
        if(obj.id == 0){
            dispatch(postData(obj))
        }else{
            dispatch(updateData(obj))
        }

        setObj({...blankObj})
    }
    
    const editData = (obj) => {
        setObj({...obj})
    }


    // console.log('Redux State Data', data)
  return (
    <>
        <div className="container py-4">
            <h2 className="text-center">Crud API with Redux</h2>
            <form className="my-3">
                <div className="row row-cols-2">
                    <div className="col mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" name='firstName' value={obj.firstName} onChange={handleChange} />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" name='lastName' value={obj.lastName} onChange={handleChange} />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="age" className="form-label">Age</label>
                        <input type="number" className="form-control" id="age" name='age' value={obj.age} onChange={handleChange} />
                    </div>
                    <div className="col mb-3">
                        Hobbies:
                        <div className="form-check">
                            <label htmlFor="h-cricket" className="form-check-label">Cricket</label>
                            <input type="checkbox" className="form-check-input" id="h-cricket" name='hobbies' value={'Cricket'} checked={obj.hobbies.includes('Cricket')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="h-football" className="form-check-label">Football</label>
                            <input type="checkbox" className="form-check-input" id="h-football" name='hobbies' value={'Football'} checked={obj.hobbies.includes('Football')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="h-reading" className="form-check-label">Reading</label>
                            <input type="checkbox" className="form-check-input" id="h-reading" name='hobbies' value={'Reading'} checked={obj.hobbies.includes('Reading')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="h-writing" className="form-check-label">Writing</label>
                            <input type="checkbox" className="form-check-input" id="h-writing" name='hobbies' value={'Writing'} checked={obj.hobbies.includes('Writing')} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col mb-3">
                        Gender:
                        <div className="form-check">
                            <label htmlFor="g-male" className="form-check-label">Male</label>
                            <input type="radio" className="form-check-input" id="g-male" name='gender' value={'Male'} checked={obj.gender.includes('Male')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="g-female" className="form-check-label">Female</label>
                            <input type="radio" className="form-check-input" id="g-female" name='gender' value={'Female'} checked={obj.gender.includes('Female')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="g-other" className="form-check-label">Other</label>
                            <input type="radio" className="form-check-input" id="g-other" name='gender' value={'Other'} checked={obj.gender.includes('Other')} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" name='city' value={obj.city} onChange={handleChange} />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="image" className="form-label">Profile</label>
                        <input type="file" className="form-control" id="image" name='image' onChange={handleChange} />
                    </div>
                </div>
                <div className="py-3 text-center" >
                    <button type='button' className="btn btn-primary" onClick={saveData}>Submit</button>
                </div>
            </form>
            <table className="table table-striped pt-4 text-center">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>Profile</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Hobbies</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map( (x, index) => <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={x.image} style={{width: '50px'}} alt="" /></td>
                        <td>{x.firstName}</td>
                        <td>{x.lastName}</td>
                        <td>{x.hobbies}</td>
                        <td>{x.gender}</td>
                        <td>{x.city}</td>
                        <td>{x.age}</td>
                        <td>
                            <button className="btn btn-warning me-1" onClick={() => editData(x)}>Update</button>
                            <button className="btn btn-danger ms-1" onClick={() => dispatch(deleteData(x._id))}>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default CrudAPIwithRedux