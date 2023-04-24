const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;
require("dotenv").config();

const makePayment = async (req, res) => {
  const data = {
    total_amount: 100,
    currency: "EUR",
    tran_id: "REF123",
    success_url: "http://localhost:3000",
    fail_url: "http://localhost:3000/error404",
    cancel_url: "http://localhost:3000",
    ipn_url: "http://localhost:3000/why",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "cust@yahoo.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
  };
  const sslcommer = new SSLCommerzPayment('testbox', 'qwerty', false); //true for live default false for sandbox
  sslcommer.init(data).then((data) => {
    console.log(data.GatewayPageURL);
    if(data?.GatewayPageURL){
      console.log('Gateway Page URL',data.GatewayPageURL);
      return res.status(200).json(data);
    }
    else{
      return res.status(400).json(data);
      console.log(data.failedreason);
    }
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters
  });
};

module.exports = {makePayment};



