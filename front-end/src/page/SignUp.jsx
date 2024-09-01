import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [obj, setObj] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        gender: ""
    });

    const handleChange = (e) => {
        obj[e.target.name] = e.target.value;
        setObj({ ...obj });
    };

    const saveData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/main/register", obj);
            console.log("Success:", response.data);
            setObj({
                username: "",
                email: "",
                password: "",
                phone: "",
                gender: "",
                confirmPassword: ""
            });
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className='w-50'>
                    <h1>Sign Up</h1>
                    <form id="form" onSubmit={saveData}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                value={obj.username}
                                className="form-control"
                                name="username"
                                id="username"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                value={obj.email}
                                className="form-control"
                                name="email"
                                id="email"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                value={obj.password}
                                className="form-control"
                                name="password"
                                id="password"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                value={obj.confirmPassword}
                                className="form-control"
                                name="confirmPassword"
                                id="confirmPassword"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="number"
                                value={obj.phone}
                                className="form-control"
                                name="phone"
                                id="phone"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 ">
                            <label className="form-label " >Gender</label>
                            <div className='d-flex flex-column'>
                                <div><input
                                    type="radio"
                                    checked={obj.gender === "Male"}
                                    value="Male"
                                    name="gender"
                                    id="gender1"
                                    onChange={handleChange}
                                />
                                    <label htmlFor="gender1" >Male</label></div>
                                <div> <input
                                    type="radio"
                                    checked={obj.gender === "Female"}
                                    value="Female"
                                    name="gender"
                                    id="gender2"
                                    onChange={handleChange}
                                />
                                    <label htmlFor="gender2" >Female</label>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button className='btn btn-success fs-4' onClick={saveData}>Sign Up</button>
                        </div>
                    </form>
                    <hr />
                    <div className='text-center'>
                        <Link className='btn btn-primary' to="/login">Log in</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
