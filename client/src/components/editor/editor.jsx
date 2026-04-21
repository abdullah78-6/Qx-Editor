import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import axios from "axios";
import {toast} from "react-toastify"
import Editors from "@monaco-editor/react";
import { useEffect, useState } from "react";
const Editor=({url})=>{
    const dispatch=useDispatch();
    const language=useSelector(state=>state.main.language);
    const backendemail=useSelector(state=>state.main.backendemail);
    const[codedetatils,setcodedetails]=useState();
    const[results,setresult]=useState();
    const[err,seterr]=useState();
useEffect(()=>{
    let jscode=localStorage.getItem("jscode");
    let lang=localStorage.getItem("lang");
    if(jscode){
        setcodedetails(jscode);
    }
    if(lang){
        dispatch(control.setlanguage(lang));
    }


},[]);
    const Sendtocompiler=async(e)=>{
        dispatch(control.setlanguage(e.target.value));
        localStorage.setItem("lang",language);
        try {
            if(language!="javascript"){
       const respose=await axios.post(url+"/api/ide/code",{language:language});
            }
            if(respose.data.status){
                toast.success(respose.data.message);
            }
            else{
                toast.error(response.data.message);
            }
            
        } catch (error) {
            console.log("editor api fetch error",error);
            
        }
        

    }
    const Reset=()=>{
        if(!codedetatils){
            toast.error("Editor is already empty");
            return ;
        }
        setcodedetails("");
        localStorage.setItem("jscode","");
        
    }
    const Runcode=async()=>{
        if(!backendemail){
            toast.error("User Login Required");
            return ;
        }
        if(!language){
            toast.error("Please Choose Language");
            return ;
        }
        if(!codedetatils){
            toast.error("PLEASE WRITE SOME CODE");
            return ;
        }
        if(language.toLowerCase()==="javascript"){
            try {
                let output="";
                const storelogs=(...args)=>{
                    output+=args.join("")+"\n";
                }
                console.log=storelogs;
                const result=eval(codedetatils);
                localStorage.setItem("jscode",codedetatils);
                if(result!=undefined){
                    output+=result;
              
                }
                setresult(output);
                seterr("");

                
            } catch (error) {
                console.log(error);
                seterr(error);
                setresult("");
                
                
            }

        }
        else{
            // other language c,c++,python,java

        }
    }
    
    return <div className="  justify-between  items-center">
       
        <div className="flex justify-center items-center">
            <select onChange={Sendtocompiler} value={language} className="border-2 mt-2 p-2 rounded-3xl text-xl font-semibold" >
                
                
                <option  value="javascript">Javascript</option>
                <option  value="c">C</option>
                <option  value="c++">C++</option>
                <option  value="python">Python</option>
                <option  value="java">Java</option>
            </select>
        </div>
 <div className=" flex justify-end items-center">
            <button onClick={Runcode} className="bg-pink-600 px-7 text-gray-800 text-xl font-semibold hover:bg-pink-900 transition ease-in-out duration-150 hover:text-white  rounded-3xl   p-1 mb-8">Run</button>
        </div>
        <div>
             <button onClick={Reset} className="bg-green-600 px-7 text-gray-800 text-xl font-semibold hover:bg-green-900 transition ease-in-out duration-150 hover:text-white  rounded-3xl   p-1 mb-8">Reset</button>
        </div>
        <div className="flex justify-center items-center gap-30">
        {language==="javascript"?<div className="w-full md:w-[45%] h-[40vh] md:h-[60vh] border rounded-xl">
        <Editors
        width="100%"
        height="100%"
        language={language}
        defaultValue="//WRITE YOUR JAVASCRIPT CODE"
        value={codedetatils}
        onChange={(e)=>setcodedetails(e)}
        />

        </div>
        :<div >
        </div>}
        
            
            {language==="javascript"?<textarea
            placeholder="CODE OUTPUT"
            className="w-full md:w-[45%] h-[40vh] md:h-[60vh] border-2 border-black rounded-xl p-3 bg-black text-white text-xl overflow-y-scroll"
            readOnly
                value={results?results:err}
             />

            :<></>}
        
        </div>
        
    </div>

}
export default Editor;