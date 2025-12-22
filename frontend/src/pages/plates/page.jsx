import plateServices from "../../services/plates"
import { useEffect } from "react";
import Loading from "../loading/page";
import PlateCard from "../../components/navbar/plateCard/plateCard";
import styles from './page.module.css'


export default function Plates(){
    
    const {getAvailablePlates, platesList, plateLoading, refetchPlates } = plateServices()
       useEffect(() => {
         if (refetchPlates) {
           getAvailablePlates();
         }
       }, [refetchPlates]);
     
       if(plateLoading){
         return (<Loading></Loading>)
       }

       console.log(platesList)


    return(
        <>
        <div className={styles.wrapper}>
            {platesList.map((plate) =>(
                <PlateCard plateData={plate} key={plate._id}></PlateCard>
            ))}
        </div>
        </>
    )
}