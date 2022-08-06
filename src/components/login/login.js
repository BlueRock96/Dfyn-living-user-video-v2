
import React, {useState} from 'react'
import styles from './login.module.css'
import EnterOTP from '../enterOtp/enterOtp'
import Register from '../register/register';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../authServices/AuthService';
import validator from 'validator';
import $ from 'jquery'
import { FaArrowLeft, FaTimes } from 'react-icons/fa';
const Auth = new AuthService();

const Login = ({panelVisible, togglePanel}) => {
    const divStyleOpen = {
        transform: "translateX(100%)"
      };
    const divStyleClose = {
        transform: "translateX(0%)"
    };

    const backToLoginPage = () =>{
        $("#otpContainer").slideUp("slow");
        $("#registerContainer").slideUp("slow");
        $("#loginContainer").slideDown("slow");

    }

    const [loginInfo, setLoginInfo] = useState({countryCode:'+91', phoneNumber:'', password: ''})

    const handleChange = (e) => {
        e.preventDefault();
        const {name,value} = e.target;
        if ( name === 'phoneNumber'){
            if(value.length !== 0){
                if(( !validator.isNumeric(value, {no_symbols: true}) || value.length > 10))
                  return            
              }
            }
            setLoginInfo(loginInfo => ({
                ...loginInfo,
                [name]: value
            }));
    };

    const onRegisterClick = (e) =>{
        e.preventDefault();
      
        $("#loginContainer").slideUp("slow");
        $("#registerContainer").slideDown("slow");
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (loginInfo.phoneNumber === "") {
                toast.error("All fields required");
                return;
            }
            if (loginInfo.phoneNumber.length !== 10) {
                toast.error("Invalid Mobile Number");
                return;                
            }
            Auth.sendOtp( loginInfo.phoneNumber, loginInfo.countryCode)
            .then(res => {
                if(res.status === true){
                       $("#loginContainer").slideUp("slow");
                       $("#otpContainer").slideDown("slow");
                }else{
                    toast.error(res.message);
                }
            })
            .catch(res => {
                    toast.error(res.message);
            })
        }
        catch(e){
            console.log(e);
            toast.error('Unable to Login. Please try again.');
        }

    }

    return (
        <>
            <div >


                <div className={`${styles.panelWrap}`} style={ panelVisible ? divStyleOpen : divStyleClose}>
                <div className = {styles.panel}>
                <span className={styles.loginCloseBtn} onClick= {togglePanel}><FaTimes/></span>

                    <div className={styles.loginContainer} id= "loginContainer">
                         

                        <div className={styles.logoSectionContainer}>
                            <div className={styles.logoInner}>
                                <img src = '/logo.png' alt='Logo Dfyn Living' className={styles.logoImg}/>
                            </div>
                            <div className={styles.logoInner}>
                                <span className={styles.title}>DFYN LIVING</span>
                                <span className={styles.subtitle}>Building Global Luxury Shopping Platform</span>
                            </div>
                        </div>  
                        <div className={styles.signinSection}>
                            <div>
                                <span className={styles.signinTextTitle}>Login</span> 
                                <span className={styles.noAccountText}>Dont have an account?</span> <span className={styles.signUpText} onClick = {onRegisterClick}>Sign up now</span> 
                            </div>
                            


                            <div className={styles.signinFormContainer}>
                                <form onSubmit = {onSubmit}>
                                    <div className="">
                                        <label className={styles.phoneLabel}>Phone Number</label>
                                        <div className="input-group-sm  mb-3">
                                            <input type="text" className='form-control' id={styles.phonenuminput} required name="phoneNumber" placeholder="Phone number" aria-label="phoneNumber" 
                                            aria-describedby="inputGroup-sizing-small" 
                                            value = {loginInfo.phoneNumber}
                                            onChange = {handleChange}
                                            />
                                        </div>
                                    </div>
 

                                    <p className={`${styles.termsText} mt-1`}>
                                        By clicking on Login, I accept the Terms & Conditions & Privacy Policy.
                                    </p>
                                    <br/>
                                    <button type="submit" className={  `btn form-control   ${styles.submitbtn} `}>
                                        Sign In 
                                    </button>

                                </form>
    
                            </div>
                        </div>


                    </div>


                    <div id="otpContainer" className={styles.otpContainer}>
                        <span className={styles.otpBack} onClick = {backToLoginPage}><FaArrowLeft/></span>
                        <EnterOTP phoneNumber = {loginInfo.phoneNumber} togglePanel={togglePanel} />
                    </div>


                    
                    <div id="registerContainer" className={styles.registerContainer}>
                        <span className={styles.otpBack} onClick = {backToLoginPage}><FaArrowLeft/></span>
                        < Register backToLoginPage = {backToLoginPage} togglePanel={togglePanel} />
                    </div>


                </div>
                </div>

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme = "colored"
                />


            </div>
        </>
        )
    }

export default Login