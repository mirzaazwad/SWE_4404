const jwt = require('jsonwebtoken');
const User = require('../model/user');
const {verifyJWT}=require('../controller/google-oauth');
const userByEmail=require('../Library/userByEmail');
const userById=require('../Library/userById');

const requireAuth = async (req, res, next) => {
  const { authorization,idtype } = req.headers;
  if (!authorization) {
    return res.status(401).json({status:401,error: 'Authorization token required'})
  }
  const token = authorization.split(' ')[1]
  try {
    if(idtype==="google"){
      const {email} = await verifyJWT(token);
      const userObject=new userByEmail(email);
      req.user=(await userObject.findByEmail()).email;
    }
    else{
      const { _id } = jwt.verify(token, process.env.SECRET);
      const userObject=new userById(_id);
      req.user=(await userObject.findById())._id;
    }

    next()

  } catch (error) {
    console.log(error)
    res.status(401).json({status:401,error: 'Request is not authorized'})
  }
}

module.exports = requireAuth