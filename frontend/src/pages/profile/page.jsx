import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import authServices from '../../services/auth';
import orderServices from "../../services/order";
import styles from "./page.module.css";
import { LuLogOut } from "react-icons/lu";
import Loading from "../loading/page";

export default function Profile() {
  const { logout } = authServices();
  const navigate = useNavigate();
  const authData = JSON.parse(localStorage.getItem('auth'));
  const { getUserOrders, orderLoading, refetchOrders, ordersList } = orderServices();

  useEffect(() => {
    if (!authData) {
      navigate('/auth');
      return;
    }
    if (refetchOrders) {
      getUserOrders(authData?.user?._id);
    }
  }, [authData, navigate, refetchOrders]);

  if (!authData || !authData.user) {
    return null;
  }

  if(orderLoading){
    return (<Loading></Loading>)
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const displayTime = (order) => {
    if (order.pickupTime) return order.pickupTime;
    if (order.createdAt) {
      try {
        const d = new Date(order.createdAt);
        return d.toLocaleString();
      } catch {
        return String(order.createdAt);
      }
    }
    return 'No time';
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.headerSection}>
        <div>
          <h1 className={styles.userName}>{authData.user.fullname}</h1>
          <h3 className={styles.userEmail}>{authData.user.email}</h3>
        </div>
        <div>
          <button className={styles.logoutBtn} onClick={handleLogout}>Logout <LuLogOut></LuLogOut></button>
        </div>
      </header>

      {orderLoading ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : ordersList && ordersList.length > 0 ? (
        <section className={styles.ordersContainer}>
          {ordersList.map((order) => (
            <article key={order._id} className={styles.orderCard}>
              <div className={styles.cardHeader}>
                <span className={styles.status}>{order.pickupStatus ?? 'Pending'}</span>
                <span className={styles.time}>{displayTime(order)}</span>
              </div>

              <div className={styles.itemsList}>
                {Array.isArray(order.orderItems) && order.orderItems.length > 0 ? (
                  order.orderItems.map((item) => (
                    <div key={item._id || `${order._id}-${Math.random()}`} className={styles.item}>
                      <h4 className={styles.itemName}>{item.itemDetails?.name ?? 'Nome Indisponível'}</h4>
                      <p className={styles.quantity}>Quantity: {item.quantity ?? 0}</p>
                    </div>
                  ))
                ) : (
                  <div className={styles.noItems}>No items in this order</div>
                )}
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className={styles.noOrders}>You do not have orders yet</div>
      )}
       <Link to={'/plates'} className={styles.platesLink}>Click here and see our specialities</Link>
    </div>
  );
}
