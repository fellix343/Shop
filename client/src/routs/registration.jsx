import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { actionRegistration } from '../store/index.js'
function Login()  {
    const dispatch = useDispatch()

    

    const user = useSelector((store)=>store.UserReducer)
    

    const [inputEmail, setInputEmail] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    return(
        <div>

            <h1>registration</h1>
            <input type="text" value={inputEmail} onChange={(e)=>setInputEmail(e.target.value)}  placeholder='email'/>
            <input type="password" value={inputPassword} onChange={(e)=>setInputPassword(e.target.value)}  placeholder='password'/>
            <input type="button" value="send" onClick={()=> {
                    dispatch(actionRegistration(inputEmail,inputPassword))
                    setInputEmail('')
                    setInputPassword('')
                }
            } />
        )
        </div>
    )
}
    
export   {Login}