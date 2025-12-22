import Navbar from "./components/navbar/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/navbar/footer/footer"
import { CartProvider } from "./contexts/useCartContext"

export default function App(){
  return(
    <>
  <CartProvider>
        <Navbar/>
    <main>
        <Outlet/>
    </main>
    <Footer></Footer>
  </CartProvider>
    </>
  )
}