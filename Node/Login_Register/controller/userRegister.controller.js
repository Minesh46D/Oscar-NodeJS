import { UserDB } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import { generateOTP } from "../utilities/generateOTP.util.js";
import jwt from "jsonwebtoken";
import { RoleDB } from "../models/role.model.js";
import { tryCatch } from "../utilities/tryCatch.util.js";
import { resStatus } from "../utilities/resStatus.util.js";
import { sendMail } from "../utilities/sendMail.util.js";
import { generateRefCode } from "../utilities/generateRefCode.util.js";

export const userRegister = tryCatch(async (req, res) => {
  let ref_ID
  const { userName, email, password, confirm_password, firstName, lastName, gender, phone_no } =
    req.body;
    let { ref_Code } = req.body
  // ---------------------    Empty Field validation     ---------------------
  if ([userName, email, password, firstName, lastName, gender].some((field) => !field)){
    return resStatus(400, res, "All fields are required");
  }
  
  // ---------------------    User Already Exist     ---------------------
  const checkUser = await UserDB.exists({
    $or: [{ email }, { phone_no }, { userName }],
  });
  
  if (checkUser) {
    return res
      .status(400)
      .json({ status: false, message: "User already exists" });
  }

  
  // ---------------------    Confirm Password Check     ---------------------
  const hashPassword = await bcrypt.hash(password, 10);
  const checkPass = await bcrypt.compare( confirm_password, hashPassword );
  if (!checkPass) {
    return resStatus(400, res, 'Password does not matchxxx')
  }
  
  // ---------------------    Ref Code Check     ---------------------
  if(ref_Code){
    const refUser = await UserDB.findOne({ ref_Code })
    if(!refUser ){
      return resStatus(400, res, "Ref Code doesn't match")
    }
    ref_ID = refUser.userName
  }
  

  // ---------------------    Generate OTP, Ref Code    ---------------------
  const otp = await generateOTP();
  ref_Code = await generateRefCode( firstName )
  const expireTime = Date.now() + 1 * 60 * 60 * 1000;
  // const sentEmail = await sendMail(`Your OTP is : ${otp}\nYour Referral Code is: ${ref_Code}`);
  console.log('------- ref_ID : ' , ref_ID)
  const user = await UserDB.create({
    userName,
    email,
    password: hashPassword,
    phone_no,
    firstName,
    lastName,
    gender,
    otp,
    otp_ExpireTime: expireTime,
    ref_ID,
    ref_Code
  });
  
  
  // ---------------------    Remove password from response     ---------------------
  const getUser = await UserDB.findOne({ _id: user._id }).select("-password");

  res.status(200).json({ status: true, message: "Registered", data: getUser });
});

export const userLogin = tryCatch(async (req, res) => {
  const { userName, password } = req.body;
  if ([userName, password].some((item) => !item)) {
    return resStatus(400, res, "All Field are required")
  }

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

  // ---------------------    Check Role ID     ---------------------
  const getRole = await RoleDB.findOne({ role_ID: User.role_ID });
  if (!getRole) {
    return resStatus(400, res, 'Invalid Role')
  }

  const loginMessage = User.isVerified ? "Logged in" : "Unverified Login"
  
  // ---------------------    Send Signed Cookie     ---------------------
  res.cookie('Login Token', {
    email: User.email,
    role: getRole.role_Name
  }, { signed: true, maxAge: 20 * 60 * 1000, httpOnly: true} )         // 20 min expire time
  return resStatus(200, res, loginMessage, {
    data: {
      ...User._doc,
      otp: undefined,
      password: undefined,
      otp_ExpireTime: undefined,
      }
    }
  )
});

export const forgotPassword = tryCatch(async (req, res) => {
  const { email } = req.body;
  const user = await UserDB.findOne({ email });
  if (!user) {
    return res.status(400).json({ status: false, message: "User not found" });
  }

  const otp = await generateOTP();
  const expireTime = Date.now() + 1 * 60 * 1000;

  user.otp = otp;
  user.otp_ExpireTime = expireTime;
  await user.save();
  await sendMail(`Your OTP to reset Password is: ${otp}`)

  const token = jwt.sign({
      email: user.email,
    },
    "diwmaodimawodimwaodi",
    { expireIn: "10m" }
  );
  return resStatus(200, res, `Email verify success, OTP sent to ${email} !`)
});

export const changePassword = tryCatch(async (req, res) => {
  const updateMessage = ""
  const { oldPassword, newPassword, confirmPassword, email } = req.body;
  if ([oldPassword, newPassword, confirmPassword, email].some((item) => !item)) {
    return res
      .status(400)
      .json({ status: false, message: "All field are required" });
  }

  const user = await UserDB.findOne({ email });

  const hashPassword = await bcrypt.hash(newPassword, 10);

  const checkBothPassword = await bcrypt.compare(confirmPassword, hashPassword);
  if (!checkBothPassword) {
    return res.status(400).json({
      status: false,
      message: "New Password can not be same as old password",
    });
  }

  
  // ---------------------    Change Password     ---------------------
  if(oldPassword){
    updateMessage = 'Password Updated!!'
    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!checkOldPassword) {
      return resStatus(400, res, 'Old password is not the same')
    }
  }
  const checkOldPassword = bcrypt.compare(newPassword, user.password)
  if(checkOldPassword){
    return resStatus(400, res, 'New Password can not be the same as old password')
  }

  await UserDB.updateOne(
    { _id: user._id },
    { $set: { password: hashPassword } }
  );

  return resStatus(200, res, updateMessage || "password updated")
});

export const otpVerify = tryCatch(async (req, res, next) => {
  const { code } = req.body;
  const user = await UserDB.findne({
    email: req.email,
    otp: code,
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
