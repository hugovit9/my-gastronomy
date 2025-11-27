import { useState } from "react"

export default function plateServices(){
    const [plateLoading, setPlatesLoading] = useState(false) 
    const [refetchPlates, setrefetchPlates] = useState(true)
    const [platesList, setPlatesList] = useState([])

    const url = "http://localhost:3000/plates"

    const getAvailablePlates = (userId) =>{
        setPlatesLoading(true)
        fetch(`${url}/availables`, {
            method: 'GET',
            headers:{
                'Content-Type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response => response.json()))
        .then((result =>{
            if(result.sucess){
                setPlatesList(result.body)
            } else{
                console.log(result)
            }
            console.log(result)
        }))
        .catch((error)=>{
            console.log(error)
        })
        .finally(() => {
            setPlatesLoading(false)
            setrefetchPlates(false)
        })
    }


    return { getAvailablePlates, plateLoading, refetchPlates, platesList }
}