const userModel = require("../models/userModel");

const getUserData = async (req,res) => {
    try {
        
        const userId = req.user.userId;

        const user = await userModel.findById(userId);

        if(!user){
            res.send({
                status:0, message:"User Not Found!"
            });
        }

        res.send({
            status:1, 
            message:"User Successfull",
            userData:{
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });


    } catch (error) {
        res.send({
            status:0, message:error.message
        });
    }
}

module.exports = getUserData;