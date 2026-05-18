const express = require("express");
const path = require("path");
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = express();
const cookieParser = require("cookie-parser");

const authRouter = require('./Routes/auth.routes');
const postRouter = require('./Routes/post.routes');
const userRouter = require('./Routes/user.routes');


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173"]
}));
app.use(cookieParser());

// logging middleware
// (disabled noisy request logging)
app.use((req, res, next) => {
    next();
});


app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use('/api/user', userRouter);


const frontendPath = path.join(__dirname, "../public/dist");

app.use(express.static(frontendPath));

app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

module.exports = app;