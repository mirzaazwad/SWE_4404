const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const googleSetup = require('./config/passport-setup-google');
const cors=require('cors');
const signUpRoutesBuyer = require("./routes/loginSignUp/buyer/signUpRoutes");
const loginRoutesBuyer = require("./routes/loginSignUp/buyer/loginRoutes");
const signUpRoutesSeller = require("./routes/loginSignUp/seller/signUpRoutes");
const loginRoutesSeller = require("./routes/loginSignUp/seller/loginRoutes");
const google_auth_signup = require("./routes/loginSignUp/google_auth/signUpRoutes");
const google_auth_login = require("./routes/loginSignUp/google_auth/loginRoutes");
const profileRoutesBuyer=require("./routes/profile/buyer/buyerRoute");
const profileRoutesSeller=require("./routes/profile/seller/sellerRoute");
const app=express();
const dbURI = process.env.ConnectionString;
mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));

  app.use(cors({
    origin:"*"
  }));

app.use(express.json());

app.use("/api/buyer/signup", signUpRoutesBuyer);
app.use("/api/buyer/login", loginRoutesBuyer);
app.use("/api/seller/signup", signUpRoutesSeller);
app.use("/api/seller/login", loginRoutesSeller);
app.use("/api/login", google_auth_login);
app.use("/api/signup", google_auth_signup);
app.use("/api/buyer/profile",profileRoutesBuyer);
app.use("/api/seller/profile",profileRoutesSeller);
