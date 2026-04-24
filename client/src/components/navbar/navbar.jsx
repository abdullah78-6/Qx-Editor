import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import { useEffect } from "react";
import {toast} from "react-toastify";
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"
const Navbar=({url})=>{
    const navigate=useNavigate();
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
            <Link to="/" className="text-xl md:text-3xl lg:text-4xl text-blue-900">qx-<span className="text-pink-700 cursor-pointer">editor</span></Link>

        </div>
        <ul className=" hidden md:flex md:gap-20 md:text-xl md:text-gray-200 xl:flex xl:gap-20 xl:text-2xl xl:text-gray-200  lg:flex lg:gap-20 lg:text-2xl lg:text-gray-200">
            <Link to="/" onClick={()=>dipatch(control.setnavclass("home"))} className={`${navclass==="home"?"text-pink-500 border-b-3 border-b-pink-500":"hover:text-pink-500 transition ease-in-out duration-150"}`}>home</Link>
            <a href="#s" onClick={()=>dipatch(control.setnavclass("step"))} className={`${navclass==="step"?"text-pink-500 border-b-3 border-b-pink-500":"hover:text-pink-500 transition ease-in-out duration-150"}`}>steps</a>
            <a href="#f" onClick={()=>dipatch(control.setnavclass("problems"))} className={`${navclass==="problems"?"text-pink-500 border-b-3 border-b-pink-500":"hover:text-pink-500 transition ease-in-out duration-150"}`}>features</a>
            
        </ul>
        <div>
            {!backendemail?<button onClick={()=>dipatch(control.setloginstatus(true))} className="bg-pink-700 p-2 rounded-2xl px-5 capitalize text-white hover:bg-pink-900 transition ease-in-out duration-150">login</button>:<div className="flex items-center gap-5 ">
            <div>
                <h1 className="text-pink-700 hover:bg-pink-700 hover:text-white transition ease-in-out duration-150 text-sm md:text-2xl lg:text-2xl xl:text-2xl border-2 rounded-4xl px-3 py-1 bg-white ">{backendemail.slice(0,1)}</h1>
                </div>
                <div>
                <button onClick={Logout} className="bg-red-700 p-2 rounded-2xl px-5 capitalize text-white hover:bg-red-900 transition ease-in-out duration-150">Logout</button>
                </div>
                </div>}
        </div>
       
       
       
        
    </div>

}
export default Navbar;