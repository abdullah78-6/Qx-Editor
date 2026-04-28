import axios from "axios"
import {GoogleGenerativeAI} from "@google/generative-ai"
const Analyze=async(req,res)=>{
    try{
    const {codedetails}=req.body;
    console.log("code from frontend is ",codedetails);
    const key=process.env.GEMNI;
    const genai=new GoogleGenerativeAI(key);
    const model=genai.getGenerativeModel({model:"gemini-1.5-flash"})
    const prompt=`
    You are an expert code analyzer.

Analyze the given code strictly in BULLET POINTS and LINE-WISE format.
DO NOT write paragraphs.

CODE:
${codedetails}

FOLLOW THESE RULES STRICTLY:

1. Detect the programming language.

2. Give output ONLY in this format:

----------------------------------------

• Language:
- <detected language>

• Code Explanation (Line-wise):
- Line 1: <explanation>
- Line 2: <explanation>
- Line 3: <explanation>
(continue for important lines only)

• Errors (if any):
- Line X: <error description>
- Line Y: <error description>
- If no errors: "No major errors found"

• Fixes:
- Line X Fix: <corrected code>
- Line Y Fix: <corrected code>

• Improvements:
- <point 1>
- <point 2>
- <point 3>

• Edge Cases:
- <possible issue 1>
- <possible issue 2>

• Resources to Learn This Language:
- YouTube Channel 1: <channel name only>
- YouTube Channel 2: <channel name only>
- YouTube Channel 3: <channel name only>
- Practice Platform: <platform name only>

----------------------------------------

IMPORTANT:
- Always mention line numbers for errors
- Keep everything in bullet points
- Do NOT use paragraphs
- Keep explanations short and clear
- DO NOT include any URLs
- Only write YouTube channel names (no links)
- Keep everything in bullet points
- Do NOT use paragraphs
- Keep explanations short and clear
    `;
    const response=await model.generateContent(prompt);
    const airesult=response.response.text();
    return res.json({status:true,result:airesult});
    }catch(err){
        console.log("ai error",err);
        return res.json({status:false,result:"ERROR IN ANALYZING"});
    }
}
export{Analyze}
