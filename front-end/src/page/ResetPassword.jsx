import Password from 'antd/es/input/Password';
import React, { useState } from 'react'

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password : "",
    confirmPassword :""
 });
  const handleChange = (e, index) => {

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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    value={formData.password}
                    className="form-control"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    placeholder="Enter your password"
                />
            </div>
            <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                    type="password"
                    value={formData.confirmPassword}
                    className="form-control"
                    name="confirmPassword"
                    id="confirmPassword"
                    onChange={handleChange}
                    placeholder="Enter your confirmPassword"
                />
            </div>
           
            <div className='text-center '>
                <button className='btn btn-primary fs-4 ' onClick={handleSubmit}>Email verify</button>
            </div>
            
        </form>
        </div>
        </div>
    </>
  )
}

export default ResetPassword