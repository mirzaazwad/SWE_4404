const nodemailer = require("nodemailer");
const emailVerification = require("../model/email-verification");
require("dotenv").config();

class SMTPClient{
  constructor(email){
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_LOGIN,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    this.email=email;
  }

  generateOTP(){
    this.OTP=Math.floor(100000 + Math.random() * 900000).toString();
    return this.OTP;
  }

  async generateMail(){
    await emailVerification.addRecord(this.email, await this.generateOTP());
    this.mailOptions = {
      from: 'mirzaazwad23931@gmail.com',
      to: this.email,
      subject: "Your OTP for verification",
      text: `Your OTP is ${this.OTP}`,
    };
  }

  async sendVerificationMail(){
    this.transporter.sendMail(this.mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        throw Error('SMTP Client Error');
      }
      else{
        return info;
      }
    });
  }

}

module.exports=SMTPClient;