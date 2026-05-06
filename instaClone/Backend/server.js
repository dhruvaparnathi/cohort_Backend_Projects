require('dotenv').config();
const app = require('./src/app');
const connectToDB = require('./src/Config/database');

connectToDB();

app.listen(3000,()=>{
    console.log("Server is live at port:3000...");
})