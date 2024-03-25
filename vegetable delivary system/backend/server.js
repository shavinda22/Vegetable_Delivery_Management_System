const express = require ("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyparser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{useNewUrlParser : true}).then(()=>{
    console.log("DB Connected"); 
    const fetch_data =  mongoose.connection.db.collection("display_datas");
   
   
}).catch((err)=>{
    console.log(err);

})

const userRouter = require("./routes/Users.js");
app.use("/api",userRouter);
const displaydataRouter = require("./routes/Displaydatas.js");
app.use("/api",displaydataRouter);
// const vegetableRouter = require("./routes/Displaydatas.js");
// app.use("/api",vegetableRouter);
const orderRouter = require("./routes/Orders.js");
app.use("/api",orderRouter);





app.listen(PORT,()=>{
    console.log(`server is up and running on port number : ${PORT}`)
})