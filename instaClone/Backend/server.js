require('dotenv').config();
const app = require('./src/app');
const PORT = process.env.PORT || 3000;
const connectToDB = require('./src/Config/database');

connectToDB();

app.listen(PORT,()=>{
    // server started
})
