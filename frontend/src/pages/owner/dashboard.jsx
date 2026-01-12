import { Link } from "react-router-dom"
import { Navigate } from "react-router-dom"
import styles from './dashboard.module.css'


export default function OwnerDashboard() {
    const auth = JSON.parse(localStorage.getItem("auth") || "{}")

if (!auth.token || auth.role !== "owner") {
  return <Navigate to="/profile" />
}
  return (
    <div className={styles.dashboardContainer}>
      <h1>Restaurant Panel</h1>

      <nav>
        <Link to="/owner/orders" className={styles.btnLinks}>Orders</Link>
        <Link to="/owner/plates" className={styles.btnLinks}>Plates</Link>
      </nav>

      <p>Welcome to the restaurant management dashboard.</p>
    </div>
  )
}
