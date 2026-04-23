// let express = require("express");
// let mongoose = require("mongoose");
// let cors = require("cors");
// let cookieParser = require("cookie-parser");
// const alphaRouter = require("./routes/userAlphaRoutes");
// const userRouter = require("./routes/userRoutes");
// require("dotenv").config();

// let app = express();

// const PORT = process.env.PORT || 5000;


// app.use(cors({
//     origin:true,
//     credentials: true
// }));
// app.use(cookieParser());

// app.use(express.json());

// app.use("/alpha-gaming", alphaRouter)
// app.use("/alpha-gaming/user", userRouter)


// mongoose.connect(process.env.DBURL).then(() => {
//     console.log("connected to mongoDB");
//     app.listen(PORT, () => {
//         console.log(`Server is running on PORT ${PORT}`);

//     })

// }).catch((err) => {
//     console.log(err);

// })



let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let cookieParser = require("cookie-parser");
const alphaRouter = require("./routes/userAlphaRoutes");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();

let app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/alpha-gaming", alphaRouter);
app.use("/alpha-gaming/user", userRouter);

// ✅ START SERVER FIRST
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

// ✅ THEN CONNECT DB
mongoose.connect(process.env.DBURL)
    .then(() => {
        console.log("connected to mongoDB");
    })
    .catch((err) => {
        console.log("MongoDB error:", err);
    });


