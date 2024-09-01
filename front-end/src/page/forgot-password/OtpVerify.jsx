import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Flex, Input, Typography } from 'antd';
const { Title } = Typography;
const OtpVerify = () => {
    const [otp, setOtp] = useState();
    let test;


    const onChange = (text) => {
        console.log('onChange:', text);
        test = text
    };
    const sharedProps = {
        onChange,
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setOtp(+test || otp)
        } catch (error) {
            console.log(error);
        }
    };
    // useEffect(() => {
    //     console.log(otp);
    // }, [otp])

    return (
        <div className='d-flex justify-content-center  align-items-center vh-100'>
            <div className='w-50'>
                <h1 className='text-center'>Verify OTP</h1>
                <form id="otpForm" onSubmit={handleSubmit}>

                    <div className="d-flex justify-content-center mb-3 flex-column">

                        <Title level={5}>enter otp</Title>
                        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />

                    </div>
                    <div className='text-center'>
                        <button type="submit" form="otpForm" className='btn btn-success'>
                            Verify OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default OtpVerify;
