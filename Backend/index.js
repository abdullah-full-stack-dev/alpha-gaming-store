let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let cookieParser = require("cookie-parser");
const alphaRouter = require("./routes/userAlphaRoutes");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();

let app = express();

// app.use(cors({credentials:true}))

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(cookieParser());

app.use(express.json());

app.use("/alpha-gaming", alphaRouter)
app.use("/alpha-gaming/user", userRouter)


// MongoDB connection
mongoose.connect(process.env.DBURL).then(() => {
    console.log("connected to mongoDB");
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server is running on PORT ${process.env.PORT}`);

    })

}).catch((err) => {
    console.log(err);

})



