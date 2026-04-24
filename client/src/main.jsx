import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux";
import codestore from './redux/store.js';
import { ToastContainer } from "react-toastify";
import {RouterProvider,createBrowserRouter} from "react-router-dom";
import Hero from './components/hero/hero.jsx';
import Editor from './components/editor/editor.jsx';
import Step from './components/steps/steps.jsx';
const url="http://localhost:8000"
const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        index:true,
        element:(
          <>
          
          <Hero/>
          <Step/>
          </>
        )
      },
      {
        path:"editor",
        element:<Editor url={url}/>
      },
      {
        path:"/",
        element:<App/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={codestore}>
    <RouterProvider router={router}>
    
    </RouterProvider>
    <ToastContainer  autoClose={3000} pauseOnHover style={{zIndex:9999}}/>
    </Provider >
    
  </StrictMode>
)
