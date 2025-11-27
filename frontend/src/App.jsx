import Navbar from "./components/navbar/navbar"
import { Outlet } from "react-router-dom"
import Footer from "./components/navbar/footer/footer"

export default function App(){
  return(
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    <Footer></Footer>
    </>
  )
}