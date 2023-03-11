const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const loginSignUpRoutes = require("./routes/login-signup-routes");
const profileRoutesUser = require("./routes/profile/user-route");
const profileRoutesBuyer = require("./routes/profile/buyer-route");
const profileRoutesSeller = require("./routes/profile/seller-route");
// const profileRoutesBuyer=require("./routes/profile/buyer/buyerRoute");
// const profileRoutesSeller=require("./routes/profile/seller/sellerRoute");
const app=express();
const dbURI = process.env.ConnectionString;
mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));

app.use(express.json());

// app.use(passport.initialize());
// app.use(passport.session());

app.use("/api",loginSignUpRoutes);
app.use("/api/profile/user",profileRoutesUser);
app.use("/api/profile/buyer",profileRoutesBuyer);
app.use("/api/profile/seller",profileRoutesSeller);
// app.use("/api/buyer/profile",profileRoutesBuyer);
// app.use("/api/seller/profile",profileRoutesSeller);
