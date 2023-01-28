import React from "react";
import {
    Route,
    Routes,
} from "react-router-dom";
import {Login} from "./routs/registration";
import {MainPage} from "./routs/mainPage";
import {DevicePanel} from './routs/DevicePanel'
import {BrandPanel} from './routs/BrandPanel' 

   
  
function App() {
    return (
        <> 
            <Routes>            
                <Route path="/" element={<Login />} />          
                <Route path="/main" element={<MainPage/>}/>   
                <Route path="/deviceAdmin" element={<DevicePanel/>}/>
                <Route path="/brendAdmin" element={<BrandPanel/>}/>   
            </Routes>
        </>
    );

}

export default App;
