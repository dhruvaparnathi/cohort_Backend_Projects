const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require('./Routes/auth.routes');
const postRouter = require('./Routes/post.routes');
const userRouter = require('./Routes/user.routes');


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use('/api/user', userRouter);


module.exports = app;