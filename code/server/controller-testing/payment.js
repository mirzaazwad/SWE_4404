const paymentController=require('../controller/payment');
const {app} = require('../server');
const chai = require('chai');
const expect = chai.expect;


describe('payment-successful', () => {
  it('should give successful payment and update the order in pharmacy and customer respectively', (done) => {
    chai.request(app) 
      .post('/api/make-payment/success/order/6462194d635c5f9fc22b4176/pharmacy/641189e9269b87897aa73125/customer/ed ez231/address/Iut gate, W9XH+6PR, Bangladesh') 
      .end((err, res) => {
        expect(res).to.have.redirect(`http://localhost:3000/checkOutPage?paymentStatus=success&oid=6462194d635c5f9fc22b4176&pid=641189e9269b87897aa73125&cname=ed ez231&address=Iut gate, W9XH+6PR, Bangladesh`); 
        expect(res.redirects[0]).to.include.keys('jsonData');
        expect(res.redirects[0].jsonData).to.deep.equal({ payment_updated: true});
      });
      done();
  });
});