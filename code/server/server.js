const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();
const loginSignUpRoutes = require("./routes/login-signup-routes");
const medicineAddRoutes = require("./routes/add-medicine-routes");
const inventoryRoutes = require("./routes/inventory-routes");
const profileRoutesUser = require("./routes/profile/user-route");
const profileRoutesBuyer = require("./routes/profile/buyer-route");
const profileRoutesSeller = require("./routes/profile/seller-route");
const profilePictureRoutes = require("./routes/profile/profilePicture-route");
const pharmaciesRoutes = require("./routes/viewPharmacies/viewPharmacies-route");
const app=express();
const dbURI = process.env.ConnectionString;
mongoose
  .connect(dbURI, { useNewURLParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.error(err));

  app.use(cors());
app.use(express.json());

app.use("/api/profile/profilePicture",profilePictureRoutes);
app.use("/api/profile/addMedicine",medicineAddRoutes);
app.use("/api/profile/inventory",inventoryRoutes);
app.use("/api",loginSignUpRoutes);
app.use("/api/pharmacies",pharmaciesRoutes);
app.use("/api/profile/user",profileRoutesUser);
app.use("/api/profile/buyer",profileRoutesBuyer);
app.use("/api/profile/seller",profileRoutesSeller);
