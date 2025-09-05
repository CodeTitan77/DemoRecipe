const mongoose=require("mongoose");
require("dotenv").config();
const MongoUrl="mongodb+srv://neoG:jT0UnL47fm79JroL@cluster0.jourr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


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