import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { createBrand, uppdateBrand,dellBrand} from '../store/index.js'
function BrandPanelComponent(){
    
    const dispatch = useDispatch()
    const [inputName, setInputName] = useState('')
      //Uppdate
      const [inputOldName, setInputOldName] = useState('')    
      const [inputNewName, setInputNewName] = useState('')
         //Dell 
    const [inputNameForDell, setInputNameForDell] = useState('')
    
    return(
        <div>
            <div>
                <h1>Create Brand</h1>

                <input value={inputName} onChange={(e)=>setInputName(e.target.value)}  placeholder='name'/> 
                <button onClick={()=>dispatch(createBrand(inputName))}>addProduct</button>
            </div>
            <div>
                <h1>Update Brand</h1>
                <input value={inputOldName} onChange={(e)=>setInputOldName(e.target.value)}  placeholder='oldName'/> 
                <input value={inputNewName} onChange={(e)=>setInputNewName(e.target.value)}  placeholder='newName'/>
                <button onClick={()=>dispatch(uppdateBrand(inputOldName,inputNewName))}>uppdateProduct</button>
            </div>
            <div>
                <h1>Dell Brand</h1>
                <input value={inputNameForDell} onChange={(e)=>setInputNameForDell(e.target.value)}  placeholder='name'/> 
                <button onClick={()=>dispatch(dellBrand(inputNameForDell))}>DellProduct</button>
            </div>
        </div>
    )
}
export  {BrandPanelComponent}
