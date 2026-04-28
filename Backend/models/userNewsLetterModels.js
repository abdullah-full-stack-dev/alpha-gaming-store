let mongoose = require("mongoose");

const newsLetterSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    }
    
});

let newsLetterModel = mongoose.model("NewsLetter", newsLetterSchema);
module.exports = newsLetterModel;