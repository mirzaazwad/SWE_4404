const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const loginSignUpRoutes = require("./routes/login-signup-routes");
const medicineAddRoutes = require("./routes/add-medicine-routes");
const inventoryRoutes = require("./routes/inventory-routes");
const profileRoutesUser = require("./routes/user-profile-route");
const profileRoutesBuyer = require("./routes/buyer-profile-route");
const profileRoutesSeller = require("./routes/seller-profile-route");
const pharmaciesRoutes = require("./routes/viewPharmacies/viewPharmacies-route");
const app=express();

const conn=mongoose
  .connect(process.env.ConnectionString, { useNewURLParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));

app.use(cors());
app.use(express.json());

// app.use("/api/profile/profilePicture",profilePictureRoutes);
app.use("/api/profile/addMedicine",medicineAddRoutes);
app.use("/api/profile/inventory",inventoryRoutes);
app.use("/api",loginSignUpRoutes);
app.use("/api/profile/user",profileRoutesUser);
app.use("/api/profile/buyer",profileRoutesBuyer);
app.use("/api/profile/seller",profileRoutesSeller);
app.use("/api/pharmacies",pharmaciesRoutes);
