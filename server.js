const express = require('express');
const colors = require('colors');
const moragan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

//mongoDb

connectDB();


//rest-obj
const app = express();

//middleware
app.use(express.json());
app.use(moragan('dev'));


//routes - for user
app.use("/api/v1/user", require('./routes/userRoutes'));
//routes - for admin

app.use("/api/v1/admin", require('./routes/adminRoutes'));

//routes-for doctor
app.use("/api/v1/doctor",require("./routes/doctorRoutes"))



app.use(express.static(path.join(__dirname,'./client/build')))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname,"./client/build/index.html"));

})



const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white);
});







