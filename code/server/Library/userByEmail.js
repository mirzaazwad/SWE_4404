const buyerModel=require('../model/buyer');
const sellerModel=require('../model/seller');
const deliveryModel=require('../model/delivery');

class user{
  constructor(email){
    this.email=email;
  }

  async findByEmail(){
    if(this.email){
      const buyer=await buyerModel.findOne({email:this.email});
      const seller=await sellerModel.findOne({email:this.email});
      const delivery=await deliveryModel.findOne({email:this.email});
      if(buyer){
        return buyer;
      }
      else if(seller){
        return seller;
      }
      else if(delivery){
        return delivery;
      }
      else{
        throw Error('User is not registered');
      }
    }
    else{
      throw Error('email has not been passed as argument');
    }
  }

  async findById(_id){
    if(this._id){
      const buyer=await buyerModel.findById(this._id);
      const seller=await sellerModel.findById(this._id);
      const delivery=await deliveryModel.findById(this._id);
      if(buyer){
        return buyer;
      }
      else if(seller){
        return seller;
      }
      else if(delivery){
        return delivery;
      }
      else{
        throw Error('User is not registered');
      }
    }
    else{
      throw Error('_id has not been passed as argument');
    }
  }

  async checkByEmail(){
    try{
      await this.findByEmail();
      return true;
    }
    catch(error){
      return false;
    }
  }

  async checkById(_id){
    try{
      await this.findById();
      return true;
    }
    catch(error){
      return false;
    }
  }

  async login(email,password){
    const user=await this.findByEmail();
    let result={};
    if(user instanceof buyerModel){
      result=await buyerModel.login(email,password);
      return {...result,userType:'buyer'};
    }
    else if(user instanceof sellerModel){
      result=await sellerModel.login(email,password);
      return {...result,userType:'seller'};
    }
    else{
      result=await deliveryModel.login(email,password);
      return {...result,userType:'delivery'};
    }
  }

  async updatePassword(password){
    const user=await this.findByEmail();
    let result={};
    if(user instanceof buyerModel){
      result=await buyerModel.updatePassword(this.email,password);
      return result;
    }
    else if(user instanceof sellerModel){
      result=await sellerModel.updatePassword(this.email,password);
      return result;
    }
    else{
      result=await deliveryModel.updatePassword(this.email,password);
      return result;
    }
  }

  async verifyEmail(verified){
    const user=await this.findByEmail();
    if(user instanceof buyerModel){
      const result=await buyerModel.findOneAndUpdate({email:this.email},{
        verified:verified
      })
      return result;
    }
    else if(user instanceof sellerModel){
      const result=await sellerModel.findOneAndUpdate({email:this.email},{
        verified:verified
      })
      return result;
    }
    else{
      const result=await deliveryModel.findOneAndUpdate({email:this.email},{
        verified:verified
      })
      return result;
    }
  }

  async verifyPassword(password){
    const user=await this.findByEmail();
    if(user instanceof buyerModel){
      const result=await buyerModel.verifyPassword(user._id,password);
      return result;
    }
    else if(user instanceof sellerModel){
      const result=await sellerModel.verifyPassword(user._id,password);
      return result;
    }
    else{
      const result=await deliveryModel.verifyPassword(user._id,password);
      return result;
    }
  }

  async loginGoogle(sub){
    const user=await this.findByEmail();
    if(user instanceof buyerModel){
      const buyer=await buyerModel.loginGoogle(this.email,sub);
      const result={...buyer._doc,userType:'buyer'};
      return result;
    }
    else if(user instanceof sellerModel){
      const seller=await sellerModel.loginGoogle(this.email,sub);
      const result={...seller._doc,userType:'seller'};
      return result;
    }
    else{
      const delivery=await deliveryModel.loginGoogle(this.email,sub);
      const result={...delivery._doc,userType:'delivery'};
      return result;
    }
  }
}

module.exports=user