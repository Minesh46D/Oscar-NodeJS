import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function EmailVerify() {
    const [formData, setFormData] = useState({
       email : ""
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (error) {
            setError('Invalid credentials, please try again.');
        }
    };

    return (
        <>
        <div className='d-flex justify-content-center'>
            <div className='w-50'>
                <h1 className='text-center'>Forgot Password</h1>
         <form id="form" onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="text"
                    value={formData.email}
                    className="form-control"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
            </div>
           
            <div className='text-center '>
                <button className='btn btn-primary fs-4 ' onClick={handleSubmit}>Email verify</button>
            </div>
            
        </form>
        </div>
        </div></>
    )
}

export default EmailVerify