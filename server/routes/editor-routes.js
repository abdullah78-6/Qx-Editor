import express from "express";
import { Editor, Runcode } from "../controller/editor-controller.js";
const editorrouter=express.Router();
editorrouter.post("/code",Editor);
editorrouter.post("/run",Runcode);
export default editorrouter;