const express = require("express");
const cors = require('cors');

//middleware
const mongoDBConnection = require('./middleware/mongoDBConnection');
const socket= require('./middleware/socket');

//routes
const loginSignUpRoutes = require("./routes/login-signup-routes");
const medicineAddRoutes = require("./routes/add-medicine-routes");
const inventoryRoutes = require("./routes/inventory-routes");
const profileRoutesUser = require("./routes/user-profile-route");
const profileRoutesBuyer = require("./routes/buyer-profile-route");
const profileRoutesSeller = require("./routes/seller-profile-route");
const purchaseRoutes = require("./routes/product-purchase-route");
const pharmaciesRoutes = require("./routes/viewPharmacies/viewPharmacies-route");
const chatRoutes = require("./routes/chat-routes");
const mobileRoutes=require("./routes/mobile-routes");
const prescriptionsRoutes = require("./routes/prescriptions-routes");


//express app setup
const pharmacyRoutes = require("./routes/viewPharmacies/medicinesOfPharmacy-route");
const orderRoutes = require("./routes/order-routes");
const app=express();
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT);

app.use('/api/make-payment',purchaseRoutes);
app.use("/api/profile/addMedicine",medicineAddRoutes);
app.use("/api/profile/inventory",inventoryRoutes);
app.use("/api",loginSignUpRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/profile/user",profileRoutesUser);
app.use("/api/profile/buyer",profileRoutesBuyer);
app.use("/api/profile/seller",profileRoutesSeller);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/pharmacies",pharmaciesRoutes);
app.use("/api/profile/chat",chatRoutes);
app.use("/api/mobile",mobileRoutes);
app.use("/api/pharmacy",pharmacyRoutes);
