import React, { useState } from 'react'

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",

    });


    const handleChange = (e) => {
       
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        } catch (error) {
        }
    };

    return (
        <>
            <div className='d-flex justify-content-center'>
                <div className='w-50'>
                    <h1 className='text-center'>Forgot Password</h1>
                    <form id="form" onSubmit={handleSubmit}>
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

export default ForgotPassword