import React from 'react'
import styles from "./header.module.css";
import { FaSearch } from 'react-icons/fa';

const Header = () => {

    return (
            <>
                    <div className= {`{styles.headerWrapper} ${styles.sticky}`}>
                        <div className={styles.headerContainer}  >
                            <div className={styles.logoContainer}>
                                <a href='/'>
                                    <img src = "/dfyn-logo-home.png" alt = 'Dfyn Living' />
                                </a>
                            </div>

                            <div>
                                <input className = {styles.searchBarInput} type = 'text' placeholder='Search'/>
                                <button className={styles.searchBtn}> <FaSearch/></button>
                            </div>                        
                            
                            <div>
                                <button className={styles.loginBtn}>Login</button> 
                            </div> 
                        </div>

                        <hr className={styles.hrHeader}/>
                    </div>

            </>
        )
    }

export default Header