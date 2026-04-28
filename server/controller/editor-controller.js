import axios from "axios"
const Editor=(req,res)=>{
    const {language}=req.body;
    console.log(language);
    try {
        res.json({status:true,message:`${language} selected`})
        
        
    } catch (error) {
        console.log("editor error","  ",error);
        res.json({status:false,message:"Editor error"});
        
    }

}
const Runcode=async(req,res)=>{
    const {language,code,userinput}=req.body;
    const languageMap={
        python:71,
        java:62,
        c:50,
        "c++":54

    };
    if(!code){
         return res.json({status:false,message:"No code provided "});
    }
    if(code.length>5000){
        return res.json({status:false,message:"Code too large"});
    }

    try {
        const response=await axios.post(
            process.env.JUDGE_URL,
            {
                source_code:code,
                language_id:languageMap[language],
                stdin:userinput||""
            },
            {
    headers: {
      "Content-Type": "application/json"
    }
            }
            
        );
       
        res.json({status:true,output:response.data.stdout||response.data.stderr||response.data.compile_output});
       
    } catch (error) {
        console.log("run code error",error);
        res.json({status:false,message:"FIX YOUR CODE"});
    } 

}
export{Editor,Runcode}
