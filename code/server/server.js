const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const signUpRoutesBuyer = require("./routes/loginSignUp/buyer/signUpRoutes");
const loginRoutesBuyer = require("./routes/loginSignUp/buyer/loginRoutes");
const signUpRoutesSeller = require("./routes/loginSignUp/seller/signUpRoutes");
const loginRoutesSeller = require("./routes/loginSignUp/seller/loginRoutes");
const app=express();
const dbURI = process.env.ConnectionString;
mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());

app.use("/api/buyer/signup", signUpRoutesBuyer);
app.use("/api/buyer/login", loginRoutesBuyer);
app.use("/api/seller/signup", signUpRoutesSeller);
app.use("/api/seller/login", loginRoutesSeller);
