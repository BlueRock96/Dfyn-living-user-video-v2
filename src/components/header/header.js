import React, {useState} from 'react'
import styles from "./header.module.css";
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import Login from '../login/login';
import AuthService from '../authServices/AuthService';
const Auth = new AuthService();

const Header = () => {
    const [panelVisible, setPanelVisible] = useState(true);
    const togglePanel = () =>{
        setPanelVisible(!panelVisible);
    }
    const overlayHide = { display: "none" };
    const overlayShow = {display: "block" };

    const toTitleCase = (str) => {
        return str.replace(
          /\w\S*/g,
          function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          }
        );
      }

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
                                { !Auth.loggedIn()?  
                                    <button className={styles.loginBtn} onClick={togglePanel}>Login</button>
                                    : 
                                    <div>
                                        <span className={styles.profilePic}><FaUserCircle/> </span> 
                                        <span className= {styles.profileName}> {toTitleCase(Auth.getUserInfo().full_name)}</span>

                                    <button className={styles.loginBtn} onClick={Auth.logout()}>Logout</button>

                                    </div>
                                }
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