const { OAuth2Client } = require("google-auth-library");
const axios = require('axios');
const buyerModel = require("../model/buyer");
const sellerModel = require("../model/seller");
const deliveryModel = require("../model/delivery");
const userByEmail=require("../Library/userByEmail");

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "postmessage"
);

const verifyJWT=async(token)=>{
  try {
    // Verify the JWT
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    // Extract the user's email address and unique Google ID from the verified JWT
    const payload = ticket.getPayload();
    return payload;
  } catch (error) {
    console.error('Error verifying JWT:', error);
  }
}

const googleAuthGetToken = async (req, res) => {
  try {
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    const userInfo = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      })
      .then((res) => res.data).catch((error)=>console.log(error));
    if(req.body.operation==='signup'){
      let result={};
      if(req.body.userType==='buyer'){
        result=await buyerModel.signUpGoogle(userInfo.name,userInfo.email,userInfo.sub,userInfo.picture,userInfo.email_verified);
        result={...result,userType:'buyer'};
      }
      else if(req.body.userType==='seller'){
        result=await sellerModel.signUpGoogle(userInfo.name,userInfo.email,userInfo.sub,userInfo.picture,userInfo.email_verified);
        result={...result,userType:'seller'};
      }
      else if(req.body.userType==='delivery'){
        result=await deliveryModel.signUpGoogle(userInfo.name,userInfo.email,userInfo.sub,userInfo.picture,userInfo.email_verified);
        result={...result,userType:'delivery'};
      }
      else{
        result=null;
      }
      return result!==null?res.status(200).json({tokens, result,userInfo}):res.status(400).json({error:'sign up unsuccessful'});
    }
    else{
      const userObject=new userByEmail(userInfo.email);
      const result=await userObject.login(userInfo.sub);
      res.status(200).json({tokens, result,userInfo});
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

const googleAuthRefreshToken = async (req, res) => {
  try{
    const user = new UserRefreshClient(
      clientId,
      clientSecret,
      req.body.refreshToken
    );
    const { credentials } = await user.refreshAccessToken(); // obtain new tokens
    res.status(200).json({credentials});
  }
  catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

module.exports = {
  googleAuthGetToken,
  googleAuthRefreshToken,
  verifyJWT
};
