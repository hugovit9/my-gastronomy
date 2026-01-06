import plateServices from "../../services/plates"
import { useContext, useEffect, useState } from "react";
import Loading from "../loading/page";
import PlateCard from "../../components/navbar/plateCard/plateCard";
import styles from './page.module.css'
import PlatePopup from "../../components/platePopup/platePopup";
import { useCartContext } from "../../contexts/useCartContext";

export default function Plates(){
    
    const {getAvailablePlates, platesList, plateLoading, refetchPlates } = plateServices()
    const [plateSelected, setPlateSelected] = useState(null)
    const { addToCart } = useCartContext()


       useEffect(() => {
         if (refetchPlates) {
           getAvailablePlates();
         }
       }, [refetchPlates]);

       const handlePlateSelected = (plate) =>{
        setPlateSelected(plate)
       }

        const handleClosePopup = () =>{
        setPlateSelected(null)
       }
        const handleAddToCart = (itemToAdd) =>{
          addToCart(itemToAdd)
       }

     
       if(plateLoading){
         return (<Loading></Loading>)
       }



    return(
        <>
        <div>
          {platesList.map((plate)=>(
            <div key={plate._id} className={styles.cardContainer} onClick={() => {handlePlateSelected(plate)}}> 
            <PlateCard plateData={plate}></PlateCard>
            </div>
          ))}
        </div>

        {plateSelected && (
          <>
          <PlatePopup plateData={plateSelected} onClose={handleClosePopup} onAddToCart={handleAddToCart}></PlatePopup>
          </>
        )}
        </>
    )
}

