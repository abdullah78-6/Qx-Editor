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
// const Runcode=async(req,res)=>{
//     const {language,code,userinput}=req.body;
//     const languageMap={
//         python:71,
//         java:62,
//         c:50,
//         "c++":54

//     };
//     if(!code){
//          return res.json({status:false,message:"No code provided "});
//     }
//     if(code.length>5000){
//         return res.json({status:false,message:"Code too large"});
//     }

//     try {
//         const response=await axios.post(
//             process.env.JUDGE_URL,
//             {
//                 source_code:code,
//                 language_id:languageMap[language],
//                 stdin:userinput||""
//             },
//             {
//     headers: {
//       "Content-Type": "application/json"
//     }
//             }
            
//         );
       
//         res.json({status:true,output:response.data.stdout||response.data.stderr||response.data.compile_output});
       
//     } catch (error) {
//         console.log("run code error",error);
//         res.json({status:false,message:"FIX YOUR CODE"});
//     } 

// }



const languageMap = {
  python: 71,
  java: 62,
  c: 50,
  "c++": 54,
    cpp: 54
};

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const Runcode = async (req, res) => {
  const { language, code, userinput } = req.body;

  // 🔒 Validation
  if (!languageMap[language]) {
    return res.status(400).json({
      status: false,
      message: "Unsupported language"
    });
  }

  if (!code || code.trim() === "") {
    return res.status(400).json({
      status: false,
      message: "No code provided"
    });
  }

  if (code.length > 5000) {
    return res.status(400).json({
      status: false,
      message: "Code too large"
    });
  }

  try {
    // 🚀 Step 1: Submit code
    const submitRes = await axios.post(
      process.env.JUDGE_URL, // should NOT have wait=true
      {
        source_code: code,
        language_id: languageMap[language],
        stdin: userinput || ""
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000
      }
    );

    const token = submitRes.data.token;

    if (!token) {
      return res.status(500).json({
        status: false,
        message: "Failed to get execution token"
      });
    }

    // 🔁 Step 2: Poll for result
    let result;
    for (let i = 0; i < 10; i++) {
      const resData = await axios.get(
        `https://ce.judge0.com/submissions/${token}?base64_encoded=false`,
        { timeout: 10000 }
      );

      if (resData.data.status.id > 2) {
        result = resData.data;
        break;
      }

      await sleep(1000); // wait before retry
    }

    if (!result) {
      return res.status(500).json({
        status: false,
        message: "Execution timed out"
      });
    }

    // 🧠 Extract output safely
    const output =
      result.stdout ||
      result.stderr ||
      result.compile_output ||
      result.message ||
      "No output";

    return res.status(200).json({
      status: true,
      output
    });

  } catch (error) {
    console.error("Run code error:", error.response?.data || error.message);

    return res.status(500).json({
      status: false,
      message: "Error executing code"
    });
  }
};


export{Editor,Runcode}
