import plateServices from "../../services/plates"
import { useContext, useEffect, useState } from "react";
import Loading from "../loading/page";
import PlateCard from "../../components/navbar/plateCard/plateCard";
import styles from './page.module.css'
import PlatePopup from "../../components/platePopup/platePopup";
import { useCartContext } from "../../contexts/useCartContext";

export default function Plates() {
  const { getAvailablePlates, platesList, plateLoading, refetchPlates } = plateServices();
  const [plateSelected, setPlateSelected] = useState(null);
  const { addToCart } = useCartContext();
  const categories = [
    { id: "Appetizer", label: "Appetizers" },
    { id: "First", label: "First Courses" },
    { id: "Second", label: "Second Courses" },
    { id: "Side", label: "Side Dishes" },
    { id: "Other", label: "Others" }
  ];

  useEffect(() => {
    if (refetchPlates) getAvailablePlates();
  }, [refetchPlates]);

  if (plateLoading) return <Loading />;

  return (
    <>
      <div className={styles.menuWrapper}>
        {categories.map((cat) => {
          const filtered = platesList.filter(p => p.category === cat.id);
          if (filtered.length === 0) return null;

          return (
            <section key={cat.id} className={styles.section}>
              <h2 className={styles.categoryTitle}>{cat.label}</h2>
              <div className={styles.grid}>
                {filtered.map((plate) => (
                  <div 
                    key={plate._id} 
                    className={styles.clickableCard} 
                    onClick={() => setPlateSelected(plate)}
                  >
                    <PlateCard plateData={plate} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {plateSelected && (
        <PlatePopup 
          plateData={plateSelected} 
          onClose={() => setPlateSelected(null)} 
          onAddToCart={addToCart} 
        />
      )}
    </>
  );
}

