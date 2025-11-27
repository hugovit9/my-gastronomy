import styles from './navbar.module.css'
import { LuShoppingCart, LuUser, LuMenu } from "react-icons/lu";
import {Drawer} from '@mui/material'
import { useState } from 'react';
import {Link} from 'react-router-dom'


export default function Navbar(){
    const [openMenu, setOpenMenu] = useState(false)
    const handleOpenMenu = () =>{
        setOpenMenu(!openMenu)
    }



    return(
        <nav className={styles.navbarContainer}>
            <div className={styles.navbarItems}>
            <Link to={'/'}>
            <img src='./public/imgs/logo.png' className={styles.logo}></img></Link>
            <div className={styles.navbarLinksContainer}>
                <Link to={'/'} className={styles.navbarLink}>Home</Link>
                <Link to={'/plates'} className={styles.navbarLink}>Plates</Link>
               <Link to={'/cart'}>
                <LuShoppingCart className={styles.navbarLink}></LuShoppingCart>
               </Link>
                <Link to={'/profile'}>
                <LuUser className={styles.navbarLink}></LuUser>
                </Link>
            </div>
            </div>
            <div className={styles.mobileNavbarItems}>
            <Link to={'/'}>
            <img src='./public/imgs/logo.png' className={styles.logo}></img>
            </Link>
            <div className={styles.mobileNavbarBtns}>
                <Link to={'/cart'}>
                <LuShoppingCart className={styles.navbarLink}></LuShoppingCart>
                </Link>
               <LuMenu className={styles.navbarLink} onClick={handleOpenMenu}></LuMenu>
            </div>
                <Drawer
            anchor='right'
            open={openMenu}
            onClose={handleOpenMenu}
            >
                <div className={styles.drawer}>
                    <Link to={'/'} className={styles.navbarLink} onClick={handleOpenMenu}>Home</Link>
        <Link to={'/plates'} className={styles.navbarLink} onClick={handleOpenMenu}>Plates</Link>
        <Link to={'/profile'} className={styles.navbarLink} onClick={handleOpenMenu}>Profile</Link>
                </div>
            </Drawer>
            </div>
        </nav>
    )
}