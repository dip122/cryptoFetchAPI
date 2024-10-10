const mongoose = require('mongoose');

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL,{});
        console.log("Mongodb is running successfully");
        console.log(`MongoDB is running at the port number ${conn.connection.port}`);
    }catch(error){
        console.log(error);
    }
}

module.exports = connectDB;