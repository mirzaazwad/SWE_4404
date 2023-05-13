const successfulPayment=(req,res)=>{
  const value=req.params;
  const orderId=value.oid;
  const pharmacyId=value.pid
  console.log('order ID: ',orderId);
  console.log('pharmacyID ID: ',pharmacyId);
  return res.redirect('http://localhost:3000/myOrders');
}

const failedPayment=(req,res)=>{
  console.log(req);
  console.log('failed');
  return res.status(400).json(req.body);
}

const instantPaymentNotification=(req,res)=>{
  console.log(req);
  console.log('ipn');
  return res.status(200).json(req.body);
}

const cancelPayment=(req,res)=>{
  console.log(req);
  console.log('cancelled');
  return res.status(400).json(req.body);
}


module.exports = {successfulPayment,failedPayment,instantPaymentNotification,cancelPayment};