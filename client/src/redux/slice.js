import {createSlice} from "@reduxjs/toolkit";
const codeslice=createSlice({
    name:"editor",
    initialState:{navclass:"",loginstatus:false,statelog:"signin",logindata:{
     name:"",
     email:"",
     password:""   
    },token:"",backendemail:"",
},
    reducers:{
        setnavclass(state,action){
            state.navclass=action.payload;

        },
        setloginstatus(state,action){
            state.loginstatus=action.payload;
        },
        setloginds(state,action){
            const {name,value}=action.payload;
            state.logindata[name]=value;
        },
        setstatelog(state,action){
            state.statelog=action.payload;

        },
        setinput(state,action){
            state.input=action.payload;
        },
        settoken(state,action){
            state.token=action.payload;
        },
        setbackendemail(state,action){
            state.backendemail=action.payload;
        },

    }
})
export const control=codeslice.actions;
export default codeslice.reducer