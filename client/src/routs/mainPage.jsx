import React from 'react'
import { useState } from 'react'
import {useDispatch, useSelector}  from 'react-redux'
import { actionGetAllProducts } from '../store/index.js'

const MainPage = () => {
    const dispatch = useDispatch()

    useState(()=>{
        dispatch(actionGetAllProducts())    
    },[])


    const products = useSelector((store)=>store.ProductReducer.products)

    
    return(
        <div>
               {
                    products.map((product, index) => {
                        return (
                            <div key={index}>
                                <img src={`http://127.0.0.1:5000/${product.img}`} alt={product.name} />
                                <h2>{product.name}</h2>
                                <p>{product.price}</p>
                            </div>
                        )
                    })    
                }
        </div>
    )
}
export   {MainPage}