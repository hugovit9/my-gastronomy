import { useState } from "react"

export default function authServices() {
  const [authLoading, setAuthLoading] = useState(false)
  const url = "http://localhost:3000/auth"

  const login = async (formData) => {
    setAuthLoading(true)
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

const result = await response.json()

if (result.sucess && result.body?.token) {

  localStorage.setItem(
    "auth",
    JSON.stringify({
      token: result.body.token,
      user: result.body.user,
      role: result.body.user.role,
    })
  )


  localStorage.setItem("token", result.body.token)
  localStorage.setItem("role", result.body.user.role)

  window.location.href = result.body.user.role === "owner" ? "/owner/dashboard" : "/"
}
    } catch (error) {
      console.log(error)
    } finally {
      setAuthLoading(false)
    }
  }

  const signup = async (formData) => {
    setAuthLoading(true)
    try {
      const response = await fetch(`${url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.sucess && result.body?.token) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            token: result.body.token,
            user: result.body.user,
            role: result.body.user.role,
          })
        )
        window.location.href = "/"
      }
    } catch (error) {
      console.log(error)
    } finally {
      setAuthLoading(false)
    }
  }

const logout = () => {
  localStorage.removeItem("auth")
  localStorage.removeItem("token")
  localStorage.removeItem("role")
  window.location.href = "/auth"
}
  return { signup, login, logout, authLoading }
}
