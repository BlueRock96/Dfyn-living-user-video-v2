import React, {useState} from 'react'
import styles from "./header.module.css";
import { FaSearch } from 'react-icons/fa';
import Login from '../login/login';

const Header = () => {
    const [panelVisible, setPanelVisible] = useState(true);
    const togglePanel = () =>{
        setPanelVisible(!panelVisible);
    }
    const overlayHide = { display: "none" };
    const overlayShow = {display: "block" };

    return (
            <>
            <div className={styles.overlay} onClick = {togglePanel} style={ panelVisible ? overlayHide:overlayShow} ></div>
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
                                <button className={styles.loginBtn} onClick={togglePanel}>Login</button> 
                            </div> 
                        </div> 

                        <hr className={styles.hrHeader}/>
                    </div>

                    <Login 
                        panelVisible={panelVisible}
                        togglePanel = {togglePanel}
                    />

            </>
        )
    }

export default Header