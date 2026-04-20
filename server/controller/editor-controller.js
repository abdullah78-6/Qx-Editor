const Editor=(req,res)=>{
    const {language}=req.body;
    try {
        console.log("editor language is ",language);
        res.json({status:true,message:"Editor is Ready"});
    } catch (error) {
        console.log("editor error","  ",error);
        res.json({status:false,message:"Editor error"});
        
    }

}
const Runcode=(req,res)=>{

}
export{Editor,Runcode}