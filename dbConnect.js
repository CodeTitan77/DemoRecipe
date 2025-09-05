const mongoose=require("mongoose");
require("dotenv").config();
const MongoUrl=process.env.MONGODB;
const initializeDatabase=async()=>{
    try{
        await mongoose.connect(MongoUrl).then(
            console.log("Database connected"));


    }
    catch(error){
        console.log(error.message);
    }

}
module.exports={initializeDatabase};