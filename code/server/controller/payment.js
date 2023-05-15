const Pharmacy = require('../model/pharmacy');
const OrderModel = require('../model/order');

const successfulPayment=async (req,res)=>{
  const value=req.params;
  const orderId=value.oid;
  const pharmacyId=value.pid;
  const orders=await OrderModel.findOneAndUpdate(
    { 'order_data._id': orderId },
    { $set: { 'order_data.$.payment_status': true }}
  );
  const result=await Pharmacy.findOneAndUpdate(
    { 'pharmacyManagerID': pharmacyId, 'Orders._id': orderId },
    { $set: { 'Orders.$.payment_status': true }}
  );
  return res.redirect(`http://localhost:3000/checkOutPage?paymentStatus=success&oid=${orderId}&pid=${pharmacyId}&cname=${value.cname}&address=${value.address}`);
}

const failedPayment=(req,res)=>{
  const value=req.params;
  const orderId=value.oid;
  const pharmacyId=value.pid;
  return res.redirect(`http://localhost:3000/checkOutPage?paymentStatus=fail&oid=${orderId}&pid=${pharmacyId}&cname=${value.cname}&address=${value.address}`);
}

const instantPaymentNotification=(req,res)=>{
  const value=req.params;
  const orderId=value.oid;
  const pharmacyId=value.pid;
  console.log(req.body);
  return res.redirect(`http://localhost:3000/checkOutPage?paymentStatus=ipn&oid=${orderId}&pid=${pharmacyId}&cname=${value.cname}&address=${value.address}`);
}

const cancelPayment=(req,res)=>{
  const value=req.params;
  const orderId=value.oid;
  const pharmacyId=value.pid;
  return res.redirect(`http://localhost:3000/checkOutPage?paymentStatus=cancel&oid=${orderId}&pid=${pharmacyId}&cname=${value.cname}&address=${value.address}`);
}


module.exports = {successfulPayment,failedPayment,instantPaymentNotification,cancelPayment};