import {useDispatch,useSelector} from "react-redux"
import { control } from "../../redux/slice";
import { useEffect } from "react";
const Navbar=()=>{
    const navclass=useSelector(state=>state.main.navclass);
    const backendemail=useSelector(state=>state.main.backendemail);
    const dipatch=useDispatch();
    useEffect(()=>{
        const email=localStorage.getItem("email");
        if(email){
            dipatch(control.setbackendemail(email));
        }

    },[backendemail]);
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
            {!backendemail?<button onClick={()=>dipatch(control.setloginstatus(true))} className="bg-pink-700 p-2 rounded-2xl px-5 capitalize text-white hover:bg-pink-900 transition ease-in-out duration-150">login</button>:<div>
                <button>Logout</button><h1>{backendemail.slice(0,1)}</h1>
                </div>}
        </div>
       
       
       
        
    </div>

}
export default Navbar;