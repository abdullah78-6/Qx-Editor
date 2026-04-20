import express from "express"
import cors from "cors";
import "dotenv/config"
import Connectdb from "./config/db.js";
import userrouter from "./routes/user-routes.js";
import cookieParser from "cookie-parser";
import editorrouter from "./routes/editor-routes.js";
const app=express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
Connectdb();
const port=process.env.PORT;
app.get("/",(req,res)=>{
    res.json("SERVER IS WORKING");

})
app.use("/api/auth",userrouter);
app.use("/api/ide",editorrouter);
app.listen(port,()=>{
    console.log(`server is listining http://localhost:${port}`);
})