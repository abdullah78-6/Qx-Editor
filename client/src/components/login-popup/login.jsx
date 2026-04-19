import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import axios from "axios"
import {toast} from "react-toastify"
const Login=({url})=>{
    const[newp,setnewp]=useState(false);
    const dispatch=useDispatch();
     const logintype=useSelector(state=>state.main.statelog);
    const inputtype=useSelector(state=>state.main.input);
    const logindatastructure=useSelector(state=>state.main.logindata);
    const[newpassword,setnewpassword]=useState("");
   const Onchangehandler=(event)=>{
    dispatch(control.setloginds({
        name:event.target.name,
        value:event.target.value
    }))
    
}
   const logintypechange=(type)=>{
    dispatch(control.setstatelog(type));
    }
     const changeinginp=(type)=>{
            dispatch(control.setinput(type));
    }
    const onlogin=async(event)=>{
    event.preventDefault();
    let newurl=url;
    if(logintype==="signin"){
        // set login api url
        newurl=newurl+"/api/auth/log"
        // dispatch(control.setprofileicon(true));
        
      

    }
    else{
        // set signup api url
        newurl=newurl+"/api/auth/reg"
    }
    try{
        const response=await axios.post(newurl,logindatastructure,{
            withCredentials:true
        });
    if(response.data.status){
          if(logintype==="signin"){
             const res=await axios.get(url+"/api/auth/pr",{
            withCredentials:true,
        })
        if(res.data.status){
            dispatch(control.setbackendemail(res.data.email));
        }
        else{
            dispatch(control.setbackendemail(""));
        }
       
       
          }
        
       
        
        toast.success(response.data.result);
        
    }
    else{
        toast.error(response.data.result);
    }

    }
    catch(err){
        toast.error("SERVER ERROR");

    }
    

}
const Resetpassword=async()=>{
try {
   
    if(!newpassword){
        toast.error("ENTER  PASSWORD AND EMAIL");
        return ;
    }
        const response=await axios.post("http://localhost:8000/api/auth/new",{newpassword,email:logindatastructure.email});
        if(response.data.status){
            toast.success(response.data.message);
        }
        else{
            toast.error(response.data.message);
        }

        
        
    } catch (error) {
        console.log("reset password error",error);
        toast.error("RESET FAILED");
        
    }
    


}
    
    return <div className="inset-0 fixed flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm cursor-pointer ">
        
            <form className="flex flex-col gap-6 shadow-2xl w-[300px] md:w-[420px] xl:w-[420px] lg:w-[420px] bg-white rounded-3xl  p-7  "onSubmit={onlogin} >
                 <div className="relative">
                <h1 className="cursor-pointer absolute text-3xl text-red-700 hover:text-red-900 tranition ease-in-out duration-150 bottom-1 top-4 right-6" onClick={()=>dispatch(control.setloginstatus(false))}><ImCross/></h1>
            </div>
            {logintype!=="signin"?<div className="flex flex-col  gap-4 " >
                <div>
                <label className="text-lg font-semibold text-blue-900" htmlFor="name">ENTER-NAME</label>
                </div>
                <div>
                <input name="name" onChange={Onchangehandler} value={logindatastructure.name} className=" border border-blue-700 p-2 rounded-3xl text-2xl text-gray-700 w-50 md:w-auto lg:w-auto xl:w-auto"  type="text"placeholder="enter-name"required/>
                </div>
                
                
    
    
            </div>:<></>
           }
           <div className="flex flex-col  gap-4">
                <div>
                <label className="text-lg font-semibold text-blue-900" htmlFor="email">ENTER-EMAIL</label>
                </div>
                <div>
                <input name="email" onChange={Onchangehandler} value={logindatastructure.email} className=" border border-blue-700 p-2 rounded-3xl text-2xl text-gray-700 w-50 md:w-auto lg:w-auto xl:w-auto" type="text"placeholder="enter-email" required/>
                </div>
            </div>
            
    
            <div className="flex flex-col  gap-4">
                <div>
                <label className="text-lg font-semibold text-blue-900" htmlFor="password">ENTER-PASSWORD</label>
                </div>
             {!newp?   <div className="flex gap-3 items-center">
                <input name="password" onChange={Onchangehandler} value={logindatastructure.password} className=" border border-blue-700 p-2 rounded-3xl text-2xl text-gray-700 w-50 md:w-auto lg:w-auto xl:w-auto" type={inputtype}placeholder="enter-password" required/>
                {inputtype==="text"?<FaRegEye className="text-2xl text-blue-800" onClick={()=>changeinginp("password")}/>:<FaEyeSlash className="text-2xl text-blue-800" onClick={()=>changeinginp("text")}/>}
                    
                </div>:<></>}
              {logintype==="signin"?  <button type="button" className="text-white bg-red-700 p-3  rounded-2xl hover:bg-red-950 transition ease-in-out duration-300 text-xl capitalize " onClick={()=>setnewp(true)}>forgot password</button>:<></>}
               {newp? <div>
                    <input onChange={(e)=>setnewpassword(e.target.value)} type="password" placeholder="new password" className=" border border-blue-700 p-2 rounded-3xl text-2xl text-gray-700 w-50 md:w-auto lg:w-auto xl:w-auto"/>
                    <button type="button" onClick={Resetpassword} className="p-2 bg-pink-700  text-xl ml-2 rounded-4xl capitalize text-white hover:bg-pink-900 transition ease-in-out duration-300">reset</button>
                    <button type="button" onClick={()=>setnewp(false)} className="ml-2 text-red-200 p-2  mt-3 rounded-4xl hover:bg-blue-950 transition ease-in-out duration-300  bg-blue-700 capitalize text-xl">cancel</button>
                </div>:<></>}
            </div>
                <div>
                    {logintype==="signin"?<p className="text-xl w-90 capitalize text-blue-600">I accepted the given terms and condetions </p>:<></>}
                    {logintype==="signin"?<input className="" type="checkbox" required/>:<></>}
                </div>
                <div>
             {logintype==="signup"?<button type="submit" className="bg-blue-600 hover:bg-blue-700 hover:text-blue-200 transition ease-in-out duration-200  text-white p-3 rounded-2xl">CREATE AN ACCOUNT</button>:<button type="submit" className="bg-blue-600   text-white p-3 rounded-2xl hover:bg-blue-700 hover:text-blue-200 transition ease-in-out duration-200">SIGN-IN</button>}   
             </div>
             <div>
            
                {logintype==="signup"?<p className=" text-lg font-semibold text-blue-900">ALREADY HAVE AN ACCOUNT <span className="text-blue-600 hover:underline hover:text-pink-500" onClick={()=>logintypechange("signin")}>Login</span></p>:<p className="text-lg font-semibold text-blue-900">DONT HAVE AN ACCOUNT <span onClick={()=>{logintypechange("signup") ;setnewp(false);}} className="text-blue-600 hover:underline hover:text-pink-500">Sign-up</span></p>}
                </div>
            
            
            </form>
            
            
        </div>
    


}
export default Login;