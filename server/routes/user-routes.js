import express from "express";
import { login, register, Reset } from "../controller/user-controller.js";
const userrouter=express.Router();
userrouter.post("/reg",register);
userrouter.post("/log",login);
userrouter.post("/new",Reset);
export default userrouter;
