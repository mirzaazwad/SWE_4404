const buyerModel=require('../model/buyer');
const sellerModel=require('../model/seller');
const deliveryModel=require('../model/delivery');

class user{
  constructor(_id){
    this._id=_id;
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

  async checkById(_id){
    try{
      await this.findById();
      return true;
    }
    catch(error){
      return false;
    }
  }

  async updatePassword(password){
    const user=await this.findById();
    let result={};
    if(user instanceof buyerModel){
      result=await buyerModel.updatePassword(user.email,password);
      return result;
    }
    else if(user instanceof sellerModel){
      result=await sellerModel.updatePassword(user.email,password);
      return result;
    }
    else{
      result=await deliveryModel.updatePassword(user.email,password);
      return result;
    }
  }

  async updateProfilePicture(imageURL){
    const user=await this.findById();
    if(user instanceof buyerModel){
      await buyerModel.findByIdAndUpdate(this._id,{imageURL:imageURL});
    }
    else if(user instanceof sellerModel){
      await sellerModel.findByIdAndUpdate(this._id,{imageURL:imageURL});
    }
    else{
      await deliveryModel.findByIdAndUpdate(this._id,{imageURL:imageURL});
    }
  }


  async verifyPassword(password){
    const user=await this.findById();
    if(user instanceof buyerModel){
      const result=await buyerModel.verifyPassword(this._id,password);
      return result;
    }
    else if(user instanceof sellerModel){
      const result=await sellerModel.verifyPassword(this._id,password);
      return result;
    }
    else{
      const result=await deliveryModel.verifyPassword(this._id,password);
      return result;
    }
  }
}

module.exports=user