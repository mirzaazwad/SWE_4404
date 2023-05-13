const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;

const makePayment = async (customer,orderID) => {
  const data = {
    total_amount: customer.amount,
    currency: "BDT",
    tran_id: orderID,
    success_url: `http://localhost:4000/api/make-payment/success/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
    fail_url: `http://localhost:4000/api/make-payment/fail/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
    cancel_url: `http://localhost:4000/api/make-payment/cancel/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
    ipn_url: `http://localhost:4000/api/make-payment/ipn/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
    shipping_method: "Courier",
    product_name: "Medical Supplies from "+customer.pharmacyManagerID,
    product_category: "Medicines",
    product_profile: "general",
    cus_name: customer.fullName,
    cus_email:customer.email,
    cus_add1: customer.address,
    cus_city: customer.address,
    cus_state: customer.address,
    cus_postcode: customer.address,
    cus_country: customer.address,
    cus_phone: customer.phone,
    ship_name: customer.fullName,
    ship_add1: customer.address,
    ship_city: customer.address,
    ship_state: customer.address,
    ship_postcode: customer.address,
    ship_country: customer.address,
    multi_card_name: "mastercard"
  };
  const sslcommer = new SSLCommerzPayment('testbox', 'qwerty', false); //true for live default false for sandbox
  const result=await sslcommer.init(data);
  return result?.GatewayPageURL?result.GatewayPageURL:null;
};

module.exports = {makePayment};



