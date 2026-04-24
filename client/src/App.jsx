import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import Login from "./components/login-popup/login";
import Navbar from "./components/navbar/navbar";
import { useDispatch,useSelector } from "react-redux";
import Hero from "./components/hero/hero";
import Step from "./components/steps/steps";
function Inner(){
  const url="http://localhost:8000"
  const dispatch=useDispatch();
  const loginstatus=useSelector(state=>state.main.loginstatus);
  return <div>

 <Navbar url={url}/>
 
  {loginstatus?<Login url={url}/>:<></>}
  
 <Outlet/>
  
  <Footer/>
  </div>
}
function App() {
  return <Inner/>
  }
export default App
