const SSLCommerzPayment = require('sslcommerz').SslCommerzPayment;
const pharmacyModel = require('../model/seller');

class MakePayment{
  constructor(customer,orderID,currency){
    this.customer={
      cus_name: customer.fullName,
      cus_email:customer.email,
      cus_add1: customer.address,
      cus_city: customer.address,
      cus_state: customer.address,
      cus_postcode: customer.address,
      cus_country: customer.address,
      cus_phone: customer.phone
    }
    this.order={
      tran_id: orderID,
      currency: currency,
      total_amount: customer.amount,
      multi_card_name: "mastercard"
    }
    this.routes={
      success_url: `http://localhost:4000/api/make-payment/success/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
      fail_url: `http://localhost:4000/api/make-payment/fail/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
      cancel_url: `http://localhost:4000/api/make-payment/cancel/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`,
      ipn_url: `http://localhost:4000/api/make-payment/ipn/order/${orderID}/pharmacy/${customer.pharmacyManagerID}/customer/${customer.fullName}/address/${customer.address}`
    }
    this.product={
      product_name: "Medical Supplies from "+this.getPharmacyDetails(customer.pharmacyManagerID).pharmacy,
      product_category: "Medicines",
      product_profile: "general",
    }
    this.shipping={
      shipping_method: "Courier",
      ship_name: customer.fullName,
      ship_add1: customer.address,
      ship_city: customer.address,
      ship_state: customer.address,
      ship_postcode: customer.address,
      ship_country: customer.address
    }
  }

  async getPharmacyDetails(pharmacyManagerID){
    const result=await pharmacyModel.findOne({pharmacyManagerID:pharmacyManagerID});
    return result;
  }

  async makePaymentRequest(){
    const paymentData={...this.customer,...this.order,...this.product,...this.routes,...this.shipping};
    const sslcommer = new SSLCommerzPayment('testbox', 'qwerty', false); //true for live default false for sandbox
    const result=await sslcommer.init(paymentData);
    if(result?.GatewayPageURL){
      return result.GatewayPageURL;
    }
    else{
      throw Error('Could not retrieve Gateway Page URL, due to:  '+result.failedreason);
    }
  }
}

module.exports = {MakePayment};



