const newsLetterModel = require("../models/userNewsLetterModels");


let newsLetterInsert = (req,res)=>{
    let {email} = req.body;

    let enquiry = new newsLetterModel({
        email:email
    });
    enquiry.save().then(()=>{
        res.send({
            status:1, message:"News Letter Details Saved Successfully!"
        });
    }).catch(()=>{
        res.send({
            status:0, message:"Error While Saving!"
        });
    })
}

module.exports = {newsLetterInsert}