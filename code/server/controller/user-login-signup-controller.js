const userModel = require("../model/user-model");
const tokenModel = require("../model/token-model");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASSWORD,
  },
});

const generateMailAndOTP = async (email) => {
  let OTP = Math.floor(100000 + Math.random() * 900000).toString();
  await tokenModel.addRecord(email, OTP);
  const mailOptions = {
    from: 'mirzaazwad8@iut-dhaka.edu',
    to: email,
    subject: "Your OTP for verification",
    text: `Your OTP is ${OTP}`,
  };
  return mailOptions;
};

const sendVerificationMail = async (email) => {
  const mailOptions = await generateMailAndOTP(email);
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw Error('SMTP Client Error');
    }
    console.log(info);
  });
};

const signUpUser = async (req, res) => {
  const { userType, username, email, password,verified } = req.body;
  try {
    const user = await userModel.signUp(userType, username, email, password,verified);
    const token = createToken(user.user._id);
    const _id = user.user._id;
    if ("buyer" in user) {
      res.status(200).json({ _id, userType: "buyer", token });
    } else {
      res.status(200).json({ _id, userType: "seller", token });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.login(email, password);
    const token = createToken(user.user._id);
    const _id = user.user._id;
    if ("buyer" in user) {
      res.status(200).json({ _id, userType: "buyer", token });
    } else {
      res.status(200).json({ _id, userType: "seller", token });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const forgot = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await userModel.getEmail(email);
    const result= await sendOTP(user.email);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyEmail = async(req,res) =>{
  const {email}=req.params;
  try{
    const result =await sendVerificationMail(email);
    const token=createToken(email);
    res.status(200).json({result,success:true,token:token});
  }
  catch(error){
    res.status(400).json({error:error.message});
  }

}

const verifyOTP = async(req,res) =>{
  const {email,OTP}=req.body;
  try{
    const result=await tokenModel.verifyOTP(email,OTP);
    res.status(200).json({result,success:true});
  }
  catch(error){
    res.status(400).json({error:error.message});
  }
}

module.exports = {
  signUpUser,
  loginUser,
  forgot,
  verifyEmail,
  verifyOTP
};
