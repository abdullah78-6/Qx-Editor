import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import axios from "axios";
import {toast} from "react-toastify"
const Editor=({url})=>{
    const dispatch=useDispatch();
    const language=useSelector(state=>state.main.language);
    const backendemail=useSelector(state=>state.main.backendemail);
    const Sendtocompiler=async(e)=>{
        if(!backendemail){
            toast.error("User Login Required");
            return ;
        }
        dispatch(control.setlanguage(e.target.value));
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
    const Runcode=async()=>{
        if(!language){
            toast.error("Please Choose Language");
            return ;
        }
        alert("output ");
    }
    
    return <div className="  justify-between  items-center">
       
        <div className="flex justify-center items-center">
            <select onChange={Sendtocompiler} value={language} className="border-2 mt-2 p-2 rounded-3xl text-xl font-semibold" >
                
                
                <option  value="javascript">Javascript</option>
                <option  value="c">C</option>
                <option  value="c++">C++</option>
                <option  value="python">Python</option>
            </select>
        </div>
 <div className=" flex justify-end items-center">
            <button onClick={Runcode} className="bg-pink-600 px-7 text-gray-800 text-xl font-semibold hover:bg-pink-900 transition ease-in-out duration-150 hover:text-white  rounded-3xl   p-1">Run</button>
        </div>
        <div ></div>
        <div ></div>
        
    </div>

}
export default Editor;