import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import axios, { all } from "axios";
import {toast} from "react-toastify"
import Editors from "@monaco-editor/react";
import { useEffect, useState } from "react";
const Editor=({url})=>{
    const dispatch=useDispatch();
    const language=useSelector(state=>state.main.language);
    const backendemail=useSelector(state=>state.main.backendemail);
    const[codedetatils,setcodedetails]=useState("");
    const[codedetatils2,setcodedetails2]=useState("");
    const[results,setresult]=useState();
    const[err,seterr]=useState();
    const[results2,setresult2]=useState();
    const[err2,seterr2]=useState();
    const [userinput,setuserinput]=useState("");
useEffect(()=>{
    let jscode=localStorage.getItem("jscode");
    // let allcode=localStorage.getItem("allcode");
    let lang=localStorage.getItem("lang");
    if(jscode){
        setcodedetails(jscode);

    }
    // if(allcode){
    //     setcodedetails2(allcode);

    // }
    if(lang){
        dispatch(control.setlanguage(lang));
        let allcode=localStorage.getItem(`allcode_${lang}`);
        if(allcode){
            setcodedetails2(allcode);
        }
        
    }


},[]);
useEffect(()=>{
    if(language&&language!=="javascript"){
        let saved=localStorage.getItem(`allcode_${language}`);
        setcodedetails2(saved||"");
    }

},[language]);

    const Sendtocompiler=async(e)=>{
        let newlanguage=e.target.value;   
        dispatch(control.setlanguage(newlanguage));
        localStorage.setItem("lang",newlanguage);
        try {
            if(newlanguage==="javascript"){
                toast.success("javascript selected");
                return ;
            }
            if(newlanguage!=="javascript"){
       const respose=await axios.post(url+"/api/ide/code",{language:newlanguage});
       if(respose.data.status){
                toast.success(respose.data.message);
            }
            else{
                toast.error(respose.data.message);
            }
            
        } 
         }
            catch (error) {
            console.log("editor api fetch error",error);
            
        }

            
        

    }
    const getDefaultvalue=(lang)=>{
        if(lang==="python"){
            return `# WRITE YOUR CODE IN ${lang} PROGRAMMING LANGUAGE`
        }
        return  `// WRITE YOUR CODE IN ${lang} PROGRAMMING LANGUAGE`
    }
    const Reset=()=>{
    let jscode2=localStorage.getItem("jscode");
 let lang2=localStorage.getItem("lang");
    if((language==="javascript"&&!codedetatils)||(language!="javascript"&&!codedetatils2)){
            toast.error("Editor is already empty");
            return ;
        }

        if(language==="javascript"&&jscode2){
            setcodedetails("");
    
        localStorage.setItem("jscode","");
        localStorage.setItem("lang","");
        
        return ;

        }
        if(language!=="javascript"){
    
        setcodedetails2("");
        
        localStorage.setItem("lang","");
        localStorage.setItem(`allcode_${language}`,"");
        return ;

        }
         
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
        if(language==="javascript"&&!codedetatils){
        toast.error("PLEASE WRITE SOME CODE");
        return ;

       }
       if(language!=="javascript"&&!codedetatils2){
        toast.error("PLEASE WRITE SOME CODE");
        return ;

       }
        localStorage.setItem("lang",language);
        if(language.toLowerCase()==="javascript"){
            try {
                let output="";
                const originallog=console.log;
                const storelogs=(...args)=>{
                    output+=args.join("")+"\n";
                }
                console.log=storelogs;
                    
                const result=eval(codedetatils);
                localStorage.setItem("jscode",codedetatils);
                if(result!=undefined){
                    output+=result;
              
                }
                console.log=originallog;
                
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
            localStorage.setItem(`allcode_${language}`,codedetatils2);
            try{
            const response=await axios.post(url+"/api/ide/run",{
                language,
                code:codedetatils2,
                userinput:userinput
            });
            if(response.data.status){
                setresult2(response.data.output);
                seterr2("");
                
            }
            
            else{
                seterr2(response.data.message);
                setresult2("");
            }
        }catch(err){
            console.log(err);
            seterr2("server error");
            setresult2("");
        }

        }
    }
     const getmonacolanguage=(lang)=>{
        switch(lang){
            case"c++":
            return "cpp";
            case"c":
            return "c";
            case"python":
            return "python";
            case"javascript":
            return "javascript";
            default:
                return "plaintext"


        }
     }
    const getIconclass=(lang)=>{
        switch(lang){
            case "javascript":
      return "devicon-javascript-plain colored";
    case "python":
      return "devicon-python-plain colored";
    case "c":
      return "devicon-c-plain colored";
    case "c++":
      return "devicon-cplusplus-plain colored";
    default:
      return "";
        }
    }
    
    return <div className="">
        <h1 className="capitalize text-sm md:text-xl lg:text-xl xl:text-xl  text-center mt-2 font-semibold text-pink-600">note: reset after executing your code </h1>
       
        <div className="flex justify-center items-center gap-3">
            {language&&(
                <i className={`${getIconclass(language)} text-2xl border-3 p-2 rounded-2xl border-black`}></i>
            )}
            
            <select onChange={Sendtocompiler} value={language} className="border-2 mt-2 p-2 rounded-3xl text-xl  font-semibold px-8 capitalize " >
                
                
                <option className=""  value="javascript">Javascript</option>
                <option className=""  value="c">C</option>
                <option className=""  value="c++">C++</option>
                <option className=""  value="python">Python</option>
            </select>
        </div>
 <div className=" flex justify-end items-center">
            <button type="button" onClick={Runcode} className="bg-pink-600 px-7 text-gray-800 text-xl font-semibold hover:bg-pink-900 transition ease-in-out duration-150 hover:text-white  rounded-3xl   p-1 mb-8 mt-5">Run</button>
        </div>
        <div>
             <button onClick={Reset} className="bg-green-600 px-7 text-gray-800 text-xl font-semibold hover:bg-green-900 transition ease-in-out duration-150 hover:text-white  rounded-3xl   p-1 mb-8">Reset</button>
        </div>
        <div className="flex justify-center items-center gap-30 flex-wrap">
        <div className="w-full md:w-[45%] h-[40vh] md:h-[60vh] border rounded-xl">
        <Editors
        width="100% "
        height="100%"
        language={getmonacolanguage(language)}
        value={
            language==="javascript"
            ?codedetatils||getDefaultvalue(language):codedetatils2||getDefaultvalue(language)
        }
            
        onChange={(value)=>language==="javascript"?setcodedetails(value||""):setcodedetails2(value||"")}
        />

        </div>
        
        
            
            <textarea
            placeholder="CODE OUTPUT"
            className="w-360  md:mr-0 md:ml-0 mr-5 ml-5 md:w-[45%] h-[40vh] md:h-[60vh] border-2 border-black rounded-xl p-3 bg-black text-white text-xl overflow-y-scroll"
            onChange={(e)=>language!=="javascript"?setuserinput(e.target.value):""}
                value={
                    language==="javascript"
                    ?results||err
                    :results2||err2
                    
                }
             />

            
            
        
        </div>
        
    </div>

}
export default Editor;