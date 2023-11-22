const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");

const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');
const messageRoute = require('./routes/messages');
const conversationRoute = require('./routes/conversations');

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

//Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/tasks", tasksRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);

dotenv.config();
mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MongoDB");
});


app.get("/", (req, res) => {
    res.send("Welcome to home page")
})

app.listen(8800, () => {
    console.log("Backend server is up and running");
})
