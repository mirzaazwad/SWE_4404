const express = require("express");
const cors = require('cors');

//middleware
require('./middleware/mongoDBConnection');
require('./middleware/socket');

//routes
const loginSignUpRoutes = require("./routes/login-signup");
const medicineAddRoutes = require("./routes/add-medicine");
const inventoryRoutes = require("./routes/inventory");
const profileRoutesUser = require("./routes/user");
const profileRoutesBuyer = require("./routes/buyer");
const profileRoutesDelivery = require("./routes/delivery");
const deliveryOrderRoutes = require("./routes/delivery-orders");
const profileRoutesSeller = require("./routes/seller");
const purchaseRoutes = require("./routes/purchase");
const pharmaciesRoutes = require("./routes/view-pharmacy");
const pharmacyOrdersRoutes = require("./routes/pharmacy-orders");
const chatRoutes = require("./routes/chat");
const mobileRoutes=require("./routes/mobile");
const prescriptionsRoutes = require("./routes/prescription");


//express app setup
const pharmacyRoutes = require("./routes/medicine-pharmacy");
const orderRoutes = require("./routes/order");
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
app.use("/api/profile/seller",profileRoutesSeller);
app.use("/api/profile/buyer",profileRoutesBuyer);
app.use("/api/prescriptions", prescriptionsRoutes);
app.use("/api/pharmacies",pharmaciesRoutes);
app.use("/api/profile/chat",chatRoutes);
app.use("/api/mobile",mobileRoutes);
app.use("/api/pharmacy",pharmacyRoutes);
app.use("/api/pharmacyOrders",pharmacyOrdersRoutes);
app.use("/api/profile/delivery",profileRoutesDelivery);
app.use("/api/delivery",deliveryOrderRoutes);

module.exports = {app};