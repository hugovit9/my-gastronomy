import { useState } from "react"

export default function orderServices(){
    const [orderLoading, setOrderLoading] = useState(false) 
    const [refetchOrders, setrefetchOrders] = useState(true)
    const [ordersList, setOrdersList] = useState([])

    const url = "http://localhost:3000/orders"

    const getUserOrders = (userId) =>{
        setOrderLoading(true)
        fetch(`${url}/userorders/${userId}`, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response => response.json()))
        .then((result =>{
            if(result.sucess){
                setOrdersList(result.body)
            } else{
                console.log(result)
            }
            console.log(result)
        }))
        .catch((error)=>{
            console.log(error)
        })
        .finally(() => {
            setOrderLoading(false)
            setrefetchOrders(false)
        })
    }


    return { getUserOrders, orderLoading, refetchOrders, ordersList }
}