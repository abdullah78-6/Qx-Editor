import {configureStore} from "@reduxjs/toolkit";
import codeslice from "./slice.js"
const codestore=configureStore({
    reducer:{
        main:codeslice
    }
})
export default codestore;