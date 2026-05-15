const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require('./Routes/auth.routes');
const postRouter = require('./Routes/post.routes');
const userRouter = require('./Routes/user.routes');


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"]
}));
app.use(cookieParser());

// Add logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} from ${req.ip}`);
    console.log('Headers:', req.headers);
    next();
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use('/api/user', userRouter);


module.exports = app;