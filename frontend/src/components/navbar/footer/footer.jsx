import styles from './footer.module.css'
import {Link} from 'react-router-dom'
import { FaGithub } from "react-icons/fa";


export default function Footer(){
    return(
        <footer className={styles.footerContainer}>
            <img src="/imgs/logo.png"></img>
            <div>
                <h2>Important Links</h2>
                <div className={styles.linksContainer}>
                    <Link className={styles.link} to={'/'}>Homepage</Link>
                    <Link className={styles.link} to={'/plates'}>Plates</Link>
                    <Link className={styles.link} to={'/profile'}>Profile</Link>
                </div>
            </div>
            <div className={styles.credits}>
                Developed by <a href='https://github.com/hugovit9' target='_blank' > <span className={styles.vitor}>Vitor Rocha</span>  <FaGithub size={20}/></a>
            </div>
        </footer>
    )
}