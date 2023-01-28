import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { createDevice, uppdateDevice,dellDevice} from '../store/index.js'
function DevicePanel() {
    const dispatch = useDispatch()
    const [inputName, setInputName] = useState('')
    const [inputPrice, setInputPrice] = useState('')
    const [inputBrandId, setInputBrandId] = useState('')
    const [inputTypeId, setInputTypeId] = useState('')
    const [inputRating, setInputRating] = useState('')
    const [inputInfo, setInputInfo] = useState('')
    const [img,setImg] = useState({}) 
    //New time if you want you can make another rout for this one 
    const [inputOldName, setInputOldName] = useState('')    
    const [inputNewName, setInputNewName] = useState('')
    const [inputNewPrice, setInputNewPrice] = useState('')
    //Dell 
    const [inputNameForDell, setInputNameForDell] = useState('')
 


    return (
        <div>
            <div>
                <h1>Create Device</h1>

                <input value={inputName} onChange={(e)=>setInputName(e.target.value)}  placeholder='name'/> 
                <input value={inputPrice} onChange={(e)=>setInputPrice(e.target.value)}  placeholder='price'/> 
                <input value={inputBrandId} onChange={(e)=>setInputBrandId(e.target.value)}  placeholder='brandId'/> 
                <input value={inputTypeId} onChange={(e)=>setInputTypeId(e.target.value)}  placeholder='typeId'/> 
                <input value={inputRating} onChange={(e)=>setInputRating(e.target.value)}  placeholder='rating'/> 
                <input value={inputInfo} onChange={(e)=>setInputInfo(e.target.value)}  placeholder='info'/> 
                <input type="file" onChange={(e)=>setImg(e.target.files[0]) }/>
    //         <button onClick={()=>dispatch(createDevice(inputName,inputPrice,inputBrandId,inputTypeId,inputInfo,img,inputRating))}>addProduct</button>
                 
            </div>
            <div>
                <h1>Update Device</h1>
                <input value={inputOldName} onChange={(e)=>setInputOldName(e.target.value)}  placeholder='oldName'/> 
                <input value={inputNewName} onChange={(e)=>setInputNewName(e.target.value)}  placeholder='newName'/> 
                <input value={inputNewPrice} onChange={(e)=>setInputNewPrice(e.target.value)}  placeholder='New Price'/> 
                <button onClick={()=>dispatch(uppdateDevice(inputOldName,inputNewName,inputNewPrice))}>uppdateProduct</button>
            </div>
            <div>
                <h1>Dell Device</h1>
                <input value={inputNameForDell} onChange={(e)=>setInputNameForDell(e.target.value)}  placeholder='name'/> 
                <button onClick={()=>dispatch(dellDevice(inputNameForDell))}>DellProduct</button>
            </div>
        </div>
    )
}
export   {DevicePanel }