
const {app} = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;


describe('payment-successful', () => {
  it('should give successful payment and update the order in pharmacy and customer respectively', (done) => {
    chai.request(app) 
      .post('/api/make-payment/success/order/6462194d635c5f9fc22b4176/pharmacy/641189e9269b87897aa73125/customer/ed%20ez231/address/Iut%20gate,%20W9XH+6PR,%20Bangladesh') 
      .end((err, res) => {
        expect(res).to.redirect;
        expect(res).to.redirectTo(`http://localhost:3000/checkOutPage?paymentStatus=success&oid=6462194d635c5f9fc22b4176&pid=641189e9269b87897aa73125&cname=ed%20ez231&address=Iut%20gate,%20W9XH+6PR,%20Bangladesh`);
      });
      done();
  });
});