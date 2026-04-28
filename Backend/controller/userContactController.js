const enquiryModel = require("../models/userContactModels");

let userDetailInsert = (req,res)=>{
    let {name,email,message} = req.body;

    let enquiry = new enquiryModel({
        name:name,
        email:email,
        message:message
    });
    enquiry.save().then(()=>{
        res.send({
            status:1, message:"Details Saved Successfully!"
        });
    }).catch(()=>{
        res.send({
            status:0, message:"Error While Saving!"
        });
    })
}




module.exports = {userDetailInsert};
