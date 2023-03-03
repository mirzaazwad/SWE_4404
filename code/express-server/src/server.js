const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
const dbURI=process.env.ConnectionString;
mongoose.connect(dbURI,{useNewURLParser:true,useUnifiedTopology:true})
.then((result)=>{
  app.listen(process.env.PORT);
  console.log(result);
})
.catch((err) => console.error(err));

app.use(express.json());

app.get('/',(req,res)=>{
  res.json({msg:"Welcome to the app"});
})