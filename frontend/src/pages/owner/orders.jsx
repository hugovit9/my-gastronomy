import { useEffect, useState } from "react"
import api from "../../services/api.js"
import { Navigate } from "react-router-dom" 
import styles from './orders.module.css'
import { Link } from "react-router-dom"
export default function OwnerOrders() {
  const [orders, setOrders] = useState([])

   const auth = JSON.parse(localStorage.getItem("auth") || "{}")

if (!auth.token || auth.role !== "owner") {
  return <Navigate to="/profile" />
}

useEffect(() => {
  api.get("/orders/owner/orders")
    .then(res => {
      if(res.data.sucess){
        setOrders(res.data.body)
      }
    })
    .catch(err => console.error(err))
}, [])

const updateStatus = (id, status) => {
  api.patch(`/orders/${id}/status`, { status }).then(() => {
    setOrders(prev =>
      prev.map(o => (o._id === id ? { ...o, pickupStatus: status } : o))
    )
  })
}

  return (
    
<div className={styles.ordersContainer}>
  <h2>Orders Received</h2>
      <nav>
        <Link to="/owner/dashboard" className={styles.btnLinks}>Dashboard</Link>
        <Link to="/owner/plates" className={styles.btnLinks}>Plates</Link>
      </nav>
  {orders.map(o => (
    <div key={o._id} className={styles.orderCard}>
      <table className={styles.orderTable}>
        <thead>
          <tr>
            <th>Status</th>
            <th>Clients</th>
            <th>Items</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{o.pickupStatus}</td>
            <td><small>{o.userEmail}</small></td>
<td>
  {o.items.map((item, index) => (
    <div key={index}>
      {item.name} (x{item.quantity})
    </div>
  ))}
</td>
 <td>
  <div className={styles.actionsContainer}>
    <button onClick={() => updateStatus(o._id, "Pending")} className={styles.btnStyle}>Pending</button>
    <button onClick={() => updateStatus(o._id, "Completed")} className={styles.btnStyle}>Completed</button>
    <button onClick={() => updateStatus(o._id, "Canceled")} className={styles.btnStyle}>Canceled</button>
  </div>
</td>
          </tr>
        </tbody>
      </table>
    </div>
  ))}
</div>
  )
}


