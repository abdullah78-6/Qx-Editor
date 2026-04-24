const Footer=()=>{
    return <div className="text-gray-800 font-semibold  px-3 py-6 bg-mist-300 mt-10 flex flex-col flex-wrap  " id="f">
        <div className="flex justify-center md:justify-between lg:justify-between xl:justify-between  items-center     flex-wrap">
        <div className=" text-center mt-2 ">
            <h1 className="text-3xl capitalize text-blue-600">qx-<span className="text-pink-700">editor</span></h1>
            <p className="text-xl text-gray-800 capitalize"> Code. Build. Debug. Faster.</p>
        </div>
       
            <div className=" mt-2 text-center capitalize mr-0 md:mr-19 xl:mr-19 lg:mr-19  flex  justify-center items-center">
                <div>
               <h1 className="text-3xl text-blue-600 ">Editor</h1> 
               <p className="text-center">syntax highlighting</p>
               <p className="text-center">auto completion</p>
               <p className="text-center">multi-language support</p>
               </div>

       
        </div>
        <div className=" mt-2 capitalize text-center">
               <h1 className="text-3xl text-blue-600 ">tools</h1> 
               <p className="text-center">clear vision</p>
               <p className="text-center">debug console</p>
               <p className="text-center">easy to run</p>

       
        </div>
        </div>
        <hr className="mt-5"/>
        
            <h1 className="text-center mt-2 text-blue-600 capitalize text-sm">© 2026. All rights reserved.</h1>
        

    </div>

}
export default Footer;