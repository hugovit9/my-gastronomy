import { Dialog, TextField } from "@mui/material";
import styles from './ConfirmOrderPopup.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../contexts/useCartContext";

export default function ConfirmOrderPopup({ open, onClose, onConfirm }) {
    const [formData, setFormData] = useState({ pickupTime: "" });
    const authData = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();
    const { showToast } = useCartContext();

    const handleConfirm = (e) => {

        e.preventDefault(); 
        e.stopPropagation();

        if (!authData?.user?._id) {
            return navigate('/auth');
        }

        if (!formData?.pickupTime) {
            alert("Please, select a pickup time.");
            return;
        }

        const orderData = {
            userId: authData?.user?._id,
            pickupTime: formData?.pickupTime
        };

        onConfirm(orderData);
        showToast("Order placed successfully!");
        onClose(); 
    };

    const handleFormDataChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
      <Dialog open={open} onClose={onClose}>
            <div className={styles.popupContainer}>
                <h2>We're almost there...</h2>
                <p>Confirm your order with the current date: <strong>{(new Date()).toLocaleDateString()}</strong>. What time will you come to pick up your order?</p>
                <form className={styles.formContainer}>
                    <TextField
                    onChange={handleFormDataChange}
                    required
                    type="time"
                    name='pickupTime'
                    />
                    <div className={styles.confirmBtns}>
                        <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                        <button onClick={handleConfirm}>Confirm</button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}