const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const nodeRouter = require("./src/routes/nodeRoutes");
const userRouter = require("./src/routes/userRoutes");

//app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//     console.log("Method : " + req.method + ", Url : " + req.url);
//     next();
// });

app.use("/users", userRouter);
app.use("/note", nodeRouter);

// app.get("/", (req, res) => {
//     return res.send("hello");
// });

// mongoose.connect("mongodb://127.0.0.1:27017/express")

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URL)
    //mongoose.connect("mongodb://127.0.0.1:27017/express")
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server is runningon " + PORT + " port");
        })
    })
    .catch((error) => {
        console.log(error);
    })