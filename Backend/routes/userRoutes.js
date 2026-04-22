let express = require("express");
const userAuth = require("../middleware/userAuth");
const getUserData = require("../controller/userController");
let userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);

module.exports = userRouter;