import mongoose from "mongoose";
const Connectdb=async()=>{
    try {
    await  mongoose.connect(process.env.MONGODB_URI);
        console.log("DB CONNECTED SUCESFULLY");
    } catch (error) {
        console.log("DB CONNECTION ERROR",error);
        
    }
}
export default Connectdb;