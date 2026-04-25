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
    origin: [
        "http://localhost:5173",
        "https://alpha-gaming-store.netlify.app"
    ],
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
        console.log(`connected to mongoDB with server ${process.env.DBURL}`);
    })
    .catch((err) => {
        console.log("MongoDB error:", err);
    });


