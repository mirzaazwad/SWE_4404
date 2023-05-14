const { OAuth2Client } = require("google-auth-library");
const axios = require('axios');
const userModel = require("../model/user");
const tokenModel = require("../model/token");

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
      .then((res) => res.data);
    if(req.body.operation==='signup'){
      const result=await userModel.signUpGoogle(req.body.userType,userInfo.name,userInfo.email,userInfo.sub,userInfo.picture,userInfo.email_verified);
      res.status(200).json({tokens, result,userInfo});
    }
    else{
      const result=await userModel.loginGoogle(userInfo.email,userInfo.sub);
      res.status(200).json({tokens, result,userInfo});
    }
  } catch (err) {
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
