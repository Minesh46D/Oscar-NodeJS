import { UserDB } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import { generateOTP } from "../utilities/generateOTP.util.js";
import jwt from "jsonwebtoken";
import { RoleDB } from "../models/role.model.js";
import { tryCatch } from "../utilities/tryCatch.util.js";
import { resStatus } from "../utilities/resStatus.util.js";
import { sendMail } from "../utilities/sendMail.util.js";
import { generateRefCode } from "../utilities/generateRefCode.util.js";
import { generateUUID } from "../utilities/generateUUID.util.js";
import Decimal from 'decimal.js'
import { checkFields } from "../utilities/checkFields.js";

export const getUser = tryCatch( async ( req, res ) => {
  const userData = await UserDB.findOne({ email: req?.local?.email })
  .select({ email: 1, firstName: 1, lastName: 1, gender: 1, phone_no: 1, address: 1, _id: 0 })
  if(!userData){
    return resStatus(400, res, 'User Not Found')
  }
  resStatus(200, res, null, 'done', {
    data: userData
  })

}   )  

export const userRegister = tryCatch(async (req, res) => {
  let ref_ID
  let userWallet
  const { userName, email, password, confirmPassword, firstName, lastName, gender, phone_no } =
    req.body;
    let { ref_Code } = req.body
  // ---------------------    Empty Field validation     ---------------------
  checkFields( res, userName, email, password, firstName, lastName, gender );
  
  // ---------------------    User Already Exist     ---------------------
  const checkUser = await UserDB.exists({
    $or: phone_no ? [{ email }, { phone_no }, { userName }] : [{ email }, { userName }],
  });
  if (checkUser) {
    return res
      .status(400)
      .json({ status: false, message: "User already exists" });
  }

  // ---------------------    Confirm Password Check     ---------------------
  const hashPassword = await bcrypt.hash(password, 10);
  const checkPass = await bcrypt.compare( confirmPassword, hashPassword );
  if (!checkPass) {
    return resStatus(400, res, 'Password does not matchxxx')
  }
  
  // ---------------------    Ref Code Check, Wallet Bonus     ---------------------
  if(ref_Code){
    const refUser = await UserDB.findOne({ ref_Code })
    if(!refUser ){
      return resStatus(400, res, "Ref Code doesn't match")
    }
    ref_ID = refUser.userName
    // ---------------------    Wallet Bonus     ---------------------
    
    const value = new Decimal(refUser.wallet.toString())
    // refUser.wallet = ((+refUser.wallet) + 500).toFixed(3)
    refUser.wallet = value.add(500).toFixed(4)
    await refUser.save()
    userWallet = 1000;
  }

  // ---------------------    Generate OTP, Ref Code, Send OTP & Ref Code to Email    ---------------------
  const emailVerifyToken = await generateUUID();
  const emailVerify_ExpireTime = Date.now() + 1 * 60 * 60 * 1000;
  ref_Code = await generateRefCode( firstName )
  // const sentEmail = await sendMail(`Verify your Email here: http://127.0.0.1:5000/login-register/user/verify_Email/${ emailVerifyToken }\nYour Referral Code is: ${ref_Code}`);
  console.log('------- emailVerifyToken : ' , emailVerifyToken)
  const user = await UserDB.create({
    userName,
    email,
    password: hashPassword,
    phone_no,
    firstName,
    lastName,
    gender,
    wallet: userWallet,
    emailVerifyToken,
    emailVerify_ExpireTime,
    ref_ID,
    ref_Code
  });
  
  
  // ---------------------    Remove password from response     ---------------------
  const getUser = await UserDB.findOne({ _id: user._id }).select({ password: 0, otp: 0, otp_ExpireTime: 0, emailVerifyToken: 0, emailVerify_ExpireTime: 0 });

  res.status(200).json({ status: true, message: "Registered", data: getUser });
});

export const userLogin = tryCatch(async (req, res) => {
  const { userName, password } = req.body;
  checkFields( res, userName, password );

  let User;
  // if (typeof uesr === "number") {
  //   User = await UserDB.findOne({ phone_no: userName });
  // } else {
  //   User = await UserDB.findOne({
  //     $or: [{ email: userName }, { userName: userName }],
  //   });
  // }
  User = await UserDB.findOne({
    $or: [{ email: userName }, { userName: userName }, { phone_no: userName }],
  });
  // ---------------------   Check User Exist     ---------------------
  if (!User) {
    return resStatus(400, res, 'Invalid Username or Password')
  }
  // ---------------------    Compare Password     ---------------------
  const checkPass = await bcrypt.compare(password, User.password);
  if (!checkPass) {
    return resStatus(400, res, "Invalid Username or Password")
  }
  // ----------------------------------    Check Role     ----------------------------------
  const getRole = await RoleDB.findOne({ role_ID: User.role_ID })
  if(!getRole){
    return resStatus(400, res, "Role not found")
  }
  // ---------------------    Check verified Status     ---------------------
  if(!User.isVerified && User.emailVerify_ExpireTime < Date.now()){
    return resStatus(400, res, "Please Verify Your Email")
  }

  const loginMessage = User.isVerified ? "Verified Login" : "Unverified Login"
  
  // ---------------------    Send Signed Cookie     ---------------------
  const loginToken = jwt.sign({
    email: User.email,
    role: getRole.role_Name
  }, process.env.JWT_SECRET)
  console.log('------- process.env.JWT_SECRET : ' , process.env.JWT_SECRET)
  console.log('------- process.env.JWT_SECRET : ' , process.env.JWT_SECRET)

  res.cookie('Login Token', loginToken, { 
    signed: true, 
    secure: true,
    httpOnly: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 1000,         // FIXME change this to 20 min
    maxAge: 60 * 60 * 1000,         // FIXME change this to 20 min
  } )         // 20 min expire time
  res.cookie('Login Data', JSON.stringify({
    isAuthenticated: true,
    isVerified: User.isVerified,
    isAccountActive: User.status,
    role_ID: User.role_ID
  }), { 
    secure: true,
    sameSite: 'None',
    maxAge: 60 * 60 * 1000,       // FIXME change this to 20 min
    maxAge: 60 * 60 * 1000,       // FIXME change this to 20 min
   })
  return resStatus(200, res, null, loginMessage, {
    data: {
      ...User._doc,
      otp: undefined,
      password: undefined,
      otp_ExpireTime: undefined,
      emailVerifyToken: undefined,
      emailVerify_ExpireTime: undefined
      }
    }
  )
});

export const userLogout = tryCatch( async ( req, res ) => {
  res.clearCookie('Login Token')
  res.clearCookie('Login Data')
  resStatus( 200, res, null, 'Logout Success' )
}  );  

export const sendPasswordOTP = tryCatch(async (req, res) => {
  const { email } = req.body;
  const User = await UserDB.findOne({ email });
  
  // ---------------------    Check Email     ---------------------
  if (!User) {
    return resStatus(400, res, "User not found")
  }
  
  // ---------------------    Generate OTP & Send OTP to Email     ---------------------
  User.otp = await generateOTP();
  User.otp_ExpireTime = Date.now() + 1 * 60 * 1000;;
  await User.save();
  // await sendMail(`Your OTP to reset Password is: ${otp}`)
  console.log(`-------Your OTP to reset Password is: ${User.otp}`)
  
  // ---------------------    Save Email to Browser Cookie     ---------------------
  const ForgotPassword_Token = jwt.sign( { email: User.email }, process.env.COOKIE_SECRET )
  res.cookie('ForgotPassword Token', ForgotPassword_Token, { 
    secure: true,                   // https only
    sameSite: 'None',               // cros origin
    signed: true,                   // signed with cookie-parser
    httpOnly: true,                 // no frontend access
    maxAge: 10 * 60 * 1000,         // 10 min
  } ) 
  return resStatus(200, res, `Email verify success, OTP sent to ${email} !`)
});

export const changePassword = tryCatch(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const { email } = req.local
  const fields = [ newPassword, confirmPassword, email ]
  req.local.role && fields.push( oldPassword )
  // ---------------------    Empty Field Validation     ---------------------
  checkFields( res, ...fields );
  
  const user = await UserDB.findOne({ email, otp: { $exists: false } });
  console.log('------- user : ' , user)
  if(!user){
    return resStatus(400, res, 'OTP not verified')
  }
  if(!user){
    return resStatus(400, res, 'OTP not verified')
  }
  const hashPassword = await bcrypt.hash(newPassword, 10);
  // ---------------------    Confirm Password     ---------------------
  const checkBothPassword = await bcrypt.compare(confirmPassword, hashPassword);
  if (!checkBothPassword) {
    return resStatus(400, res, "New Password and Confirm Password doesn't match")
  }
  // ---------------------    Check Old Password     ---------------------
  let updateMessage = ""
  if(oldPassword){
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkOldPassword) {
      return resStatus(400, res, 'Old password is not the same')
    }
    updateMessage = 'Password Updated!!'
  }
  const checkOldPassword = await bcrypt.compare(newPassword, user.password)
  if(checkOldPassword){
    return resStatus(400, res, 'New Password can not be the same as old password')
  }
  // ---------------------    Update     ---------------------
  await UserDB.updateOne(
    { _id: user._id },
    { $set: { password: hashPassword } }
  );
  res.clearCookie('ForgotPassword Token')
  res.clearCookie('Login Token')
  return resStatus(200, res, updateMessage || "password Changed")
});

export const otpVerify = tryCatch(async (req, res, next) => {
  const { email } = req.local
  console.log('------- email : ' , email)
  const { otp } = req.body;
  const user = await UserDB.findOne({
    email,
    otp,
    otp_ExpireTime: { $gt: Date.now() },
  });
  if (!user) {
    return resStatus(400, res, 'Invalid OTP')
  }
  user.otp = undefined;
  user.expireTime = undefined;
  await user.save();

  return resStatus(200, res, 'OTP verify successfully')
});

export const verifyEmail = tryCatch( async ( req, res ) => {
  const { emailVerifyToken } = req.params

  const User = await UserDB.findOne({ emailVerifyToken, emailVerify_ExpireTime: { $gt: Date.now() } })
  if(!User){
      return resStatus( 400, res, "Invalid Email Verify Link" )
  }
  User.emailVerifyToken = undefined;
  User.emailVerify_ExpireTime = undefined;
  User.isVerified = true;
  await User.save()
  
  resStatus(200, res, "Email Verified Successfully")
} ) 

export const resendEmail = tryCatch(async ( req, res ) => {
  const { email } = req.signedCookies["Login Token"] || req.body
  
  // ---------------------    Check if User is logged in or have email in body    ---------------------
  if(!email){
    return resStatus(400, res, 'email required')
  }
  const User = await UserDB.findOne({ email })
  if(!User){
    return resStatus(400, res,'Email is invalid')
  }
  if(User.isVerified){
    return resStatus(400, res,'Email is already verified')
  }

  // ---------------------    Generate New Email Token and send to Email     ---------------------
  const emailVerifyToken = await generateUUID();
  const emailVerify_ExpireTime = Date.now() + 1 * 60 * 60 * 1000;
  // const sentEmail = await sendMail(  email ,`Verify your Email here: http://127.0.0.1:5000/login-register/user/verify_Email/${ emailVerifyToken }\nYour Referral Code is: ${ref_Code}`);
  console.log('------- emailVerifyToken : ' , emailVerifyToken)

  User.emailVerifyToken = emailVerifyToken;
  User.emailVerify_ExpireTime = emailVerify_ExpireTime
  await User.save()
  return resStatus(200, res, `Email Sent Successfully to ${ email } `)
} )
export const checkUser = tryCatch( async ( req, res ) => {
  const { userName } = req.body
  if(!userName){
    return resStatus(400, res, 'userName not found')
  }
  const User = await UserDB.exists({ userName })
  if(!User){
    return resStatus(200, res)
  }

  return resStatus(400, res, 'userName already exists' )
}  );
export const checkEmail = tryCatch( async ( req, res ) => {
  const { email } = req.body
  if(!email){
    return resStatus(400, res, 'email not found')
  }
  const User = await UserDB.exists({ email })
  if(!User){
    return resStatus(200, res)
  }

  return resStatus(409, res, 'email already exists' )
}  );
