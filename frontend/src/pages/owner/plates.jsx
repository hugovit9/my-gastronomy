import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../../services/api"
import styles from "./plates.module.css"
import { Link } from "react-router-dom"

export default function OwnerPlates() {
  const [plates, setPlates] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: ""
  })

  const auth = JSON.parse(localStorage.getItem("auth") || "{}")

  if (!auth.token || auth.role !== "owner") {
    return <Navigate to="/profile" />
  }

  useEffect(() => {
    api.get("/plates").then(res => {
      if (res.data.sucess) {
        setPlates(res.data.body)
      }
    })
  }, [])

  const deletePlate = async (id) => {
    if (!window.confirm("Deseja realmente excluir este prato?")) return

    await api.delete(`/plates/${id}`)
    setPlates(prev => prev.filter(p => p._id !== id))
  }

  const openEdit = (plate) => {
    setEditingId(plate._id)
    setForm({
      name: plate.name,
      price: plate.price,
      description: plate.description
    })
  }

  const saveEdit = async (id) => {
    await api.put(`/plates/${id}`, form)

    setPlates(prev =>
      prev.map(p =>
        p._id === id ? { ...p, ...form } : p
      )
    )

    setEditingId(null)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dish Management</h2>
            <Link to="/owner/dashboard" className={styles.btnLinks}>Dashboard</Link>
            <Link to="/owner/plates" className={styles.btnLinks}>Orders</Link>
      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {plates.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.description}</td>

                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.editBtn}
                      onClick={() => openEdit(p)}
                    >
                      Edit
                    </button>

                    <button
                      className={styles.btnDelete}
                      onClick={() => deletePlate(p._id)}
                    >
                      Delete
                    </button>
                  </div>

                  {editingId === p._id && (
                    <div className={styles.editForm}>
                      <input
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Name"
                      />

                      <input
                        type="number"
                        value={form.price}
                        onChange={e => setForm({ ...form, price: e.target.value })}
                        placeholder="Price"
                      />

                      <textarea
                        value={form.description}
                        onChange={e => setForm({ ...form, description: e.target.value })}
                        placeholder="Description"
                      />

                      <div className={styles.formActions}>
                        <button onClick={() => saveEdit(p._id)}>Save</button>
                        <button onClick={() => setEditingId(null)}>Cancel</button>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
