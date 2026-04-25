import express from "express"
import { Analyze } from "../controller/ai-controller.js";
const airouter=express.Router();
airouter.post("/ai",Analyze);
export default airouter