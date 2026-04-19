import express from "express";
import { getProfile, login, Logout, register, Reset } from "../controller/user-controller.js";
const userrouter=express.Router();
userrouter.post("/reg",register);
userrouter.post("/log",login);
userrouter.post("/new",Reset);
userrouter.post("/out",Logout);
userrouter.get("/pr",getProfile);
export default userrouter;
