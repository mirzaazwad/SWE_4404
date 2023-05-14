const jwt = require('jsonwebtoken');
const User = require('../model/user');
const {verifyJWT}=require('../controller/google-oauth');

const requireAuth = async (req, res, next) => {
  const { authorization,idtype } = req.headers;
  if (!authorization) {
    return res.status(401).json({status:401,error: 'Authorization token required'})
  }
  const token = authorization.split(' ')[1]
  try {
    if(idtype==="google"){
      const { email } = verifyJWT(token);
      req.user = await User.findOne({ email }).select('email')
    }
    else{
      const { _id } = jwt.verify(token, process.env.SECRET)
      req.user = await User.findOne({ _id }).select('_id')
    }

    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({status:401,error: 'Request is not authorized'})
  }
}

module.exports = requireAuth