import { UserDB } from "../models/user.model.js";
import bcrypt, { hash } from "bcrypt";
import { generateOTP } from "../utilities/generateOTP.util.js";
import jwt from "jsonwebtoken";
import { RoleDB } from "../models/role.model.js";
import { tryCatch } from "../utilities/tryCatch.util.js";
import { resStatus } from "../utilities/resStatus.util.js";
import { sendMail } from "../utilities/sendMail.util.js";

export const userRegister = tryCatch(async (req, res) => {
  console.log('------- userRegister...')
  const { userName, email, password, firstName, lastName, gender, phone_no, confirm_password } =
    req.body;
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

  
  // ---------------------    Generate OTP     ---------------------
  const otp = await generateOTP();
  const expireTime = Date.now() + 1 * 60 * 60 * 1000;
  const sentEmail = await sendMail(`Your OTP is : ${otp}`);

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
  if (!User) {
    return resStatus(400, res, 'Invalid Username or Password')
  }

  const checkPass = await bcrypt.compare(password, User.password);
  if (!checkPass) {
    return resStatus(400, res, "Invalid Username or Password")
  }

  const getRole = await RoleDB.findOne({ role_ID: User.role_ID });
  if (!getRole) {
    return resStatus(400, res, 'Invalid Role')
  }

  const token = jwt.sign(
    {
      email: User.email,
      role: getRole.role_Name,
    },
    "diwmaodimawodimwaodi",
    { expiresIn: "10h" }
  );
  return resStatus(200, res, 'Logged in', {
    data: {
      ...User._doc,
      otp: undefined,
      password: undefined,
      otp_ExpireTime: undefined,
      }
    },
    token
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
