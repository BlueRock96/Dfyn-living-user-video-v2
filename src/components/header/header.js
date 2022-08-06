import React, {useState} from 'react'
import styles from "./header.module.css";
import { FaSearch, FaUserCircle, FaTimes ,FaSignOutAlt} from 'react-icons/fa';
import Login from '../login/login';

import AuthService from '../authServices/AuthService';
const Auth = new AuthService();

const Header = ({videosList, setVideoList, videosListCopy, panelVisible, togglePanel}) => {

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

      const [searchString, setSearchString] = useState('')

      const handleChange = (e) => {
        
        e.preventDefault();
        const {name,value} = e.target;
        setSearchString(value);
        onSearch();
        
        if(value === ''){onSearchReset()}
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          onSearch();
        }
      }

     const  onSearch = () =>{
        if(searchString){
            setVideoList(videosListCopy);
            const searchedVideos = videosList.filter(d => d.title.toLowerCase().includes(searchString.toLowerCase()));
            setVideoList(searchedVideos);
        }

      }
      const onSearchReset = () =>{
        setSearchString('');
        setVideoList(videosListCopy);
      }
      return (
            <>
            <div className={styles.overlay} onClick = {togglePanel} style={ panelVisible ? overlayHide:overlayShow} ></div>
                    <div className= {`{styles.headerWrapper} ${styles.sticky}`}>
                        <div className={styles.headerContainer}  >

                        <div className={styles.mobileLogoLogoutCont}>

                            <div className={styles.logoContainer}>
                                <a href='/'>
                                    <img src = "/dfyn-logo-home.png" alt = 'Dfyn Living' />
                                </a>
                            </div>
                            <div className={styles.mobileLogoContainer}>
                            { !Auth.loggedIn()?  
                                        <button className={styles.loginBtn} onClick={togglePanel}>Login   </button>
                                        : 
                                        <div>
                                            <span className={styles.profilePic}><FaUserCircle/> </span> 
                                            <span className= {styles.profileName}> {toTitleCase(Auth.getUserInfo().full_name)}</span>
                                            <FaSignOutAlt className={styles.logoutIcon}  onClick={ e=>{Auth.logout(); window.location.reload()}} />
                                            {/* // <button  className={styles.logoutBtn} onClick={ e=>{Auth.logout(); window.location.reload()} }><FaSignOutAlt/></button> */}
                                        </div>
                                    }
                            </div>
                        </div>

                          
                            <div className={styles.searchContainer}>
                                <input className = {styles.searchBarInput} 
                                    onChange = {handleChange}
                                    type = 'text' placeholder='Search'
                                    value = {searchString}
                                    onKeyDown={handleKeyDown}/>
                                <button className={styles.searchResetBtn} onClick = {onSearchReset}> <FaTimes/></button>
                                <button className={styles.searchBtn} onClick = {onSearch}> <FaSearch/></button>
                            </div>                        
                            
  
                            <div className={styles.loginBtnContainer}>
                                { !Auth.loggedIn()?  
                                    <button className={styles.loginBtn} onClick={togglePanel}>Login   </button>
                                    : 
                                    <div>
                                        <span className={styles.profilePic}><FaUserCircle/> </span> 
                                        <span className= {styles.profileName}> {toTitleCase(Auth.getUserInfo().full_name)}</span>
                                        <button  className={styles.logoutBtn} onClick={ e=>{Auth.logout(); window.location.reload()} }>Logout</button>
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