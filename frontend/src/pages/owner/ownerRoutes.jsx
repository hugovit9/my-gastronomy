import { Navigate } from "react-router-dom"


export default function OwnerRoute({ user, children }) {
  
  if (user?.role !== "owner") {
    return <Navigate to="/" />
  }
  
  return children
}