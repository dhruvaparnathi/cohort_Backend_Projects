const express = require("express");
const authRouter = require('./Routes/auth.routes');
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use("/api/auth",authRouter);
app.use(cookieParser());

module.exports = app;