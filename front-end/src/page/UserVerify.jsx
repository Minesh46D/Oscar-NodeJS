import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const UserVerify = () => {
    const [otp, setOtp] = useState('');
    const [token, setToken] = useState(''); 

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
    };

    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!token) {
                throw new Error('Token is required');
            }

            const response = await axios.post("http://localhost:5000/api/main/userVerify",
                { otp }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }   
            );

            console.log("Success:", response.data);
            setOtp(''); 
        } catch (error) {
            console.error('Error verifying OTP:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='w-50'>
                <h1 className='text-center'>Verify User</h1>
                <form id="otpForm" onSubmit={handleSubmit}>
                    <div className="d-flex justify-content-center mb-3 flex-column">
                        <label >Enter OTP</label>
                        <input
                            type='number'
                            min={100000}
                            max={999999}
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter OTP"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="token">Token</label>
                        <input
                            type="text"
                            id="token"
                            value={token}
                            onChange={handleTokenChange}
                            placeholder="Enter Token"
                        />
                    </div>
                    <div className='text-center'>
                        <Button type="submit" form="otpForm" className='btn btn-success'>
                            Verify OTP
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserVerify;
