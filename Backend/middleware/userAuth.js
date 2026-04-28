let jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;
    

    if (!token) {
        return res.send({
            status: 0, message: "Not authorized. Login Again"
        });
    }

    try {

        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

       

        if (tokenDecode.id) {
            // req.body.userId = tokenDecode.id
            req.user = { userId: tokenDecode.id };
            
            
        } else {
            return res.send({
                status: 0, message: "Not authorized. Login Again"
            });
        }

        next();


    } catch (error) {
         res.send({
            status: 0, message: error.message
        });
    }
}

module.exports = userAuth;