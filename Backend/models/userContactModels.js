let mongoose = require("mongoose");

const userContactSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});



let enquiryModel = mongoose.model("ContactEnquiry", userContactSchema);
module.exports = enquiryModel;
