import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import EmailVerify from './forgot-password/EmailVerify'
import OtpVerify from './forgot-password/OtpVerify'
import ForgotPassword from './forgot-password/ForgotPassword'
import ResetPassword from './ResetPassword'
import UserVerify from './UserVerify'


const RoutesPage = () => {
  return (
    <>
        <BrowserRouter>
                <Routes>
                   <Route path="/" element={<Navigate to="/login"/>}/>
                   <Route path="/login" element={<SignIn/>} />
                   <Route path="/register" element={<SignUp/>}/>
                   <Route path="/user-verify" element={<UserVerify/>}/>
                   <Route path="/email-verify" element={<EmailVerify/>}/>
                   <Route path="/otp-verify" element={<OtpVerify/>}/>
                   <Route path="/forgot-password" element={<ForgotPassword/>}/>
                   <Route path="/reset-password" element={<ResetPassword/>}/>

                   
                </Routes>
        </BrowserRouter>
    </>
  )
}


export default RoutesPage
                    