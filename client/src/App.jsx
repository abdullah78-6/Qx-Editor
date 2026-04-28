import { Outlet } from "react-router-dom";
import Footer from "./components/footer/footer";
import Login from "./components/login-popup/login";
import Navbar from "./components/navbar/navbar";
import { useDispatch,useSelector } from "react-redux";
import Hero from "./components/hero/hero";
import Step from "./components/steps/steps";
function Inner(){
  const url="https://qx-editor-server.onrender.com"
  const dispatch=useDispatch();
  const theme=useSelector(state=>state.main.theme);
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
