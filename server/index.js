import express from "express"
import cors from "cors";
import "dotenv/config"
import Connectdb from "./config/db.js";
import userrouter from "./routes/user-routes.js";
const app=express();
app.use(express.json());
app.use(cors());
Connectdb();
const port=process.env.PORT;
app.get("/",(req,res)=>{
    res.json("SERVER IS WORKING");

})
app.use("/api/auth",userrouter);
app.listen(port,()=>{
    console.log(`server is listining http://localhost:${port}`);
})