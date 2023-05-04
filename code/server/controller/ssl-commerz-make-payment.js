const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;
require("dotenv").config();

const makePayment = async (req, res) => {
  const data = {
    total_amount: req.body.amount,
    currency: "BDT",
    tran_id: req.body.orderID,
    success_url: "http://localhost:4000/api/make-payment/success",
    fail_url: "http://localhost:4000/api/make-payment/fail",
    cancel_url: "http://localhost:4000/api/make-payment/cancel",
    ipn_url: "http://localhost:4000/api/make-payment/ipn",
    shipping_method: "Courier",
    product_name: "Medical Supplies from "+req.body.pharmacyName,
    product_category: "Medicines",
    product_profile: "general",
    cus_name: req.body.customerName,
    cus_email:req.body.customerEmail,
    cus_add1: req.body.address,
    cus_city: req.body.city,
    cus_state: req.body.city,
    cus_postcode: req.body.postalCode,
    cus_country: req.body.country,
    cus_phone: req.body.phoneNumber,
    ship_name: req.body.customerName,
    ship_add1: req.body.address,
    ship_city: req.body.city,
    ship_state: req.body.city,
    ship_postcode: req.body.postalCode,
    ship_country: req.body.country,
    multi_card_name: "mastercard"
  };
  const sslcommer = new SSLCommerzPayment('testbox', 'qwerty', false); //true for live default false for sandbox
  sslcommer.init(data).then((data) => {
    console.log(data.GatewayPageURL);
    if(data?.GatewayPageURL){
      console.log('Gateway Page URL',data.GatewayPageURL);
      return res.status(200).redirect(data.GatewayPageURL);
    }
    else{
      console.log(data.failedreason);
      return res.status(400).json(data);
    }
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters
  });
};

module.exports = {makePayment};



