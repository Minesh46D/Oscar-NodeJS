import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';


const Table = () => {
    const  [ary, setAry] = useState([])
    const [obj, setObj] = useState({
        _id: "",
    firstName: "",
    lastName: "",
    age: "",
    hobbies: [],
    gender: "",
    city: "",
    })
    

  let deleteData = (id) => {
    const data = fetch("https://student-api.mycodelibraries.com/api/user/delete").then((res) => {

        console.log(res.data)
        ary.push(obj)
        data();
      })
      .catch((err) => {
        console.log(err);
      });
  
  let editData = (x) => {
    let editData = {...x}
    editData.hobbies = editData?.hobbies.split(",")
    setObj({...editData})
    console.log(x)
  };
    


  return (
    <>
        <div className="text-center">
        <table className="table table-striped table-light border-1 border-dark  ">
          <thead className="table table">
            <tr>
              <th>id</th>
              <th>firstname</th>
              <th>lastName</th>
              <th>hobbies</th>
              <th>gender</th>
              <th>city</th>
              <th>age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="tbody">
            {ary.map((x, i) => {
              return (
                <tr key={`x+${i}`}>
                  <td>{i + 1}</td>
                  <td>{x.firstName}</td>
                  <td>{x.lastName}</td>
                  <td>{x.hobbies}</td>
                  <td>{x.gender}</td>
                  <td>{x.city}</td>
                  <td>{x.age}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-success me-2"
                      onClick={() => editData(x)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      onClick={() => deleteData(x._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
}


export default Table