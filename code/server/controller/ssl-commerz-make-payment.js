const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;
require("dotenv").config();

const makePayment = async (customer,orderID) => {
  const data = {
    total_amount: customer.amount,
    currency: "BDT",
    tran_id: orderID,
    success_url: `http://localhost:4000/api/make-payment/success/order/${orderID}/pharmacy/${customer.pharmacyManagerID}`,
    fail_url: "http://localhost:4000/api/make-payment/fail",
    cancel_url: "http://localhost:4000/api/make-payment/cancel",
    ipn_url: "http://localhost:4000/api/make-payment/ipn",
    shipping_method: "Courier",
    product_name: "Medical Supplies from "+customer.pharmacyManagerID,
    product_category: "Medicines",
    product_profile: "general",
    cus_name: customer.fullName,
    cus_email:customer.email,
    cus_add1: customer.address,
    cus_city: customer.city,
    cus_state: customer.city,
    cus_postcode: customer.postalCode,
    cus_country: customer.country,
    cus_phone: customer.phone,
    ship_name: customer.fullName,
    ship_add1: customer.address,
    ship_city: customer.city,
    ship_state: customer.city,
    ship_postcode: customer.postalCode,
    ship_country: customer.country,
    multi_card_name: "mastercard"
  };
  const sslcommer = new SSLCommerzPayment('testbox', 'qwerty', false); //true for live default false for sandbox
  const result=await sslcommer.init(data);
  return result.GatewayPageURL;
};

module.exports = {makePayment};



