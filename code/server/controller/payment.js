const successfulPayment=(req,res)=>{
  console.log(req);
  console.log('successful');
  return res.status(200).json(req.body);
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