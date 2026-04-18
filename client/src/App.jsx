import Login from "./components/login-popup/login";
import Navbar from "./components/navbar/navbar";
import { useDispatch,useSelector } from "react-redux";
function Inner(){
  const url="http://localhost:8000"
  const dispatch=useDispatch();
  const loginstatus=useSelector(state=>state.main.loginstatus);
  return <div>
  <Navbar url={url}/>
  {loginstatus?<Login url={url}/>:<></>}
  </div>
}
function App() {
  return <Inner/>
  }
export default App
