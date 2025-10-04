const addressModel = require("../models/address.model");

async function addressForm(req,res) {
    const { fullName, phoneNumber, email, pincode, state, fullAddress, city } = req.body;

    const user_id = req.user._id
    
    const isAddressAlreadyExits = await addressModel.findOne({ user_id })


    if(isAddressAlreadyExits){
             isAddressAlreadyExits.fullName = fullName;
             isAddressAlreadyExits.phoneNumber = phoneNumber;
             isAddressAlreadyExits.email = email;
             isAddressAlreadyExits.pincode = pincode;
             isAddressAlreadyExits.state = state;
             isAddressAlreadyExits.fullAddress = fullAddress;
             isAddressAlreadyExits.city = city;

      await isAddressAlreadyExits.save();
      
      return res.status(200).json({
        message: "address update successfully",
        address: isAddressAlreadyExits
    })
    }


        const newAddress = await addressModel.create({
           user_id,
           fullName,
           phoneNumber,
           email,
           pincode,
           state,
           fullAddress,
           city,
    });

    res.status(201).json({
      message: "Address saved successfully",
      address: newAddress,
    });

}

async function getAddress(req,res) {
   const user_id = req.user._id;

   const address = await addressModel.findOne({ user_id})

   if(!address){
    return res.status(404).json({
      message: "please add address"
    })
   }
   res.status(200).json({
     address
   })
}

module.exports = {
    addressForm,
    getAddress
}