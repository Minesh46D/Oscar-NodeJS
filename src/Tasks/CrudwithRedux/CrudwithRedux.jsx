import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteData, submitData, updateData } from './action/crudAction'

const CrudwithRedux = () => {
    const blankObj = {id: 0, fname: '', lname: '', profile: '', email: '', gender: '', hobbies: []}
    const [obj, setObj] = useState({id: 0, fname: '', lname: '', profile: '', email: '', gender: '', hobbies: []})
    const [count, setCount] = useState(0)
    const data = useSelector(store => store.crudReducer.data)
    const dispatch = useDispatch()

    const handleChange = async (e) => {
        if(e.target.name == 'hobbies'){
            if(e.target.checked){
                obj.hobbies = [...obj.hobbies, e.target.value]
            }else{
                obj.hobbies = [...obj.hobbies.filter( (x) => x != e.target.value)]
            }
        }else if(e.target.type == 'file'){
            obj.profile = e.target.files[0] ? await toBase64(e.target.files[0]) : ''
        }
        else{
            obj[e.target.name] = e.target.value
        }

        setObj ({...obj})
    }

    const submitForm = (e) => {
        e.preventDefault()
        if(obj.id == 0){
            let tempCount = count;
            tempCount++;
            obj.id = tempCount;
            setCount(tempCount)
            dispatch(submitData(obj))
        }else{
            let editIndex = data.findIndex( (x) => obj.id == x.id)
            dispatch(updateData(obj, editIndex))
        }

        setObj({...blankObj})
        console.log(data)
    }

    const editData = (ob) => {
        let editObj = data.find( (x) => x.id == ob.id);
        setObj({...editObj})
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

  return (
    <>
        <div className="container py-4">
            <h2 className="text-center">Crud with Redux</h2>
            <form id='form1'>
                <div className="row row-cols-2">
                    <div className="col mb-3">
                        <label htmlFor="fname" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="fname" name='fname' value={obj.fname} onChange={handleChange} />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="lname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lname" name='lname' value={obj.lname} onChange={handleChange} />
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name='email' value={obj.email} onChange={handleChange} />
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
                        Hobbies:
                        <div className="form-check">
                            <label htmlFor="h-reading" className="form-check-label">Reading</label>
                            <input type="checkbox" className="form-check-input" id="h-reading" name='hobbies' value={'Reading'} checked={obj.hobbies.includes('Reading')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="h-writing" className="form-check-label">Writing</label>
                            <input type="checkbox" className="form-check-input" id="h-writing" name='hobbies' value={'Writing'} checked={obj.hobbies.includes('Writing')} onChange={handleChange} />
                        </div>
                        <div className="form-check">
                            <label htmlFor="h-travel" className="form-check-label">Travel</label>
                            <input type="checkbox" className="form-check-input" id="h-travel" name='hobbies' value={'Travel'} checked={obj.hobbies.includes('Travel')} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="col mb-3">
                        <label htmlFor="profile" className="form-label">Profile</label>
                        <input type="file" className="form-control" id="profile" name='profile' onChange={handleChange} />
                    </div>
                </div>
                <div className="text-center">
                    <button form='form1' type='submit' className="btn btn-primary" onClick={submitForm}>Submit</button>
                </div>
            </form>
            <table className="table table-striped text-center mt-5">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Profile</th>
                        <th>Fname</th>
                        <th>Lname</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Hobbies</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {console.log('final data', data)}
                    {data.map( (ob, index) => <tr key={index}>
                        <td>{ob.id}</td>
                        <td><img src={ob.profile} style={{width: '50px'}} alt="" /></td>
                        <td>{ob.fname}</td>
                        <td>{ob.lname}</td>
                        <td>{ob.email}</td>
                        <td>{ob.gender}</td>
                        <td>{ob.hobbies.join(', ')}</td>
                        <td>
                            <button className="btn btn-warning mx-2" onClick={() => editData(ob)}>Edit</button>
                            <button className="btn btn-danger mx-2" onClick={() => dispatch(deleteData(obj.id))}>Delete</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default CrudwithRedux