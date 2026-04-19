import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import { useEffect } from "react";
import {toast} from "react-toastify";
import axios from "axios"
const Navbar=({url})=>{
    const navclass=useSelector(state=>state.main.navclass);
    const backendemail=useSelector(state=>state.main.backendemail);
    const dipatch=useDispatch();
    useEffect(()=>{
        const fetchuser=async()=>{
            try {
                const res=await axios.get(url+"/api/auth/pr",{
                    withCredentials:true
                })
                if(res.data.status){
                    dipatch(control.setbackendemail(res.data.email));
                }
                else{
                    dipatch(control.setbackendemail(""));
                }
            } catch (error) {
                dipatch(control.setbackendemail(""));
                
            }
        };
        fetchuser();

    },[]);
    const Logout=async()=>{
        const response=await axios.post(url+"/api/auth/out",{},{
            withCredentials:true
        });
        if(response.data.status){
            dipatch(control.setbackendemail(""));
        toast.success(response.data.message);

        }
        else{
            toast.error(response.data.message);
        }

    }
    return <div className="capitalize font-semibold flex justify-between bg-linear-to-b from-blue-400 to-blue-600  text-gray-800 items-center p-4 cursor-pointer">
        <div className="cursor-pointer">
            <h1 className="text-4xl text-blue-900">qx-<span className="text-pink-700 cursor-pointer">editor</span></h1>

        </div>
        <ul className="flex gap-20 text-2xl text-gray-200 ">
            <li onClick={()=>dipatch(control.setnavclass("home"))} className={`${navclass==="home"?"text-pink-500 border-b-3 border-b-pink-500":"hover:text-pink-500 transition ease-in-out duration-150"}`}>home</li>
            <li onClick={()=>dipatch(control.setnavclass("step"))} className={`${navclass==="step"?"text-pink-500 border-b-3 border-b-pink-500":"hover:text-pink-500 transition ease-in-out duration-150"}`}>steps</li>
            <li onClick={()=>dipatch(control.setnavclass("problems"))} className={`${navclass==="problems"?"text-pink-500 border-b-3 border-b-pink-500":"hover:text-pink-500 transition ease-in-out duration-150"}`}>problems</li>
            
        </ul>
        <div>
            {!backendemail?<button onClick={()=>dipatch(control.setloginstatus(true))} className="bg-pink-700 p-2 rounded-2xl px-5 capitalize text-white hover:bg-pink-900 transition ease-in-out duration-150">login</button>:<div className="flex items-center gap-5 ">
            <div>
                <h1 className="text-pink-700 hover:bg-pink-700 hover:text-white transition ease-in-out duration-150 text-2xl border-2 rounded-4xl px-3 py-1 bg-white ">{backendemail.slice(0,1)}</h1>
                </div>
                <div>
                <button onClick={Logout} className="bg-red-700 p-2 rounded-2xl px-5 capitalize text-white hover:bg-red-900 transition ease-in-out duration-150">Logout</button>
                </div>
                </div>}
        </div>
       
       
       
        
    </div>

}
export default Navbar;