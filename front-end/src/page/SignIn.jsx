import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [obj, setObj] = useState({
        user: '',
        password: '',
    });

  
    const handleChange = (e) => {
        obj[e.target.name] = e.target.value;
        setObj({ ...obj });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/main/login", obj);
            console.log("Success:", response.data);
            setObj({
                user: "",
                password: "",
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='d-flex justify-content-center'>
            <div className='w-50'>
                <h1 className='text-center'>Login</h1>
                <form id="form" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="user" className="form-label">User</label>
                        <input
                            type="text"
                            value={obj.user}
                            className="form-control"
                            name="user"
                            id="user"
                            onChange={handleChange}
                            placeholder="Enter your user-name/email/phone-number"
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
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className='text-center '>
                        <button className='btn btn-primary fs-4 ' onClick={handleSubmit}>Log In</button>
                    </div>
                    <div className='text-center pt-3'>
                        <Link to="/email-verify" >Forgotten password?</Link>
                    </div>
                </form>
                <hr />
                <div className='text-center'>
                    <Link className='btn btn-success' to="/register">Sign UP</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
