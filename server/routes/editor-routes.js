import express from "express";
import { Editor } from "../controller/editor-controller.js";
const editorrouter=express.Router();
editorrouter.post("/code",Editor);
export default editorrouter;