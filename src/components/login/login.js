
import React, {useState, useEffect} from 'react'
import styles from './login.module.css'
// import EnterOTP from '../enterOtp/enterOtp'
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import { useParams , useNavigate    } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import AuthService from '../authServices/AuthService';
import $ from 'jquery'

const Login = () => {
    let navigate = useNavigate();
    const divStyleOpen = {
        transform: "translateX(100%)"
      };
      const divStyleClose = {
        transform: "translateX(0%)"
      };

      const Auth = new AuthService();

    const [panelVisible, setPanelVisible] = useState(false);
    // const [isPasswordVisible] = useState(false);
    // const [passwordFieldType] = useState('password')

    // const togglePasswordVisibility = (e) =>{
    //     this.setState({isPasswordVisible: !this.state.isPasswordVisible}, ()=>{
    //         this.setState({passwordFieldType: this.state.isPasswordVisible ? 'text' : 'password'})
    //     }); 
    // }
    const togglePanel = () =>{
        setPanelVisible(!panelVisible);
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

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (loginInfo.phoneNumber === "" || loginInfo.password === "") {
                toast.error("All fields required");
                return;
            }
            if (loginInfo.phoneNumber.length !== 10) {
                toast.error("Invalid Mobile Number");
                return;                
            }
            Auth.login(loginInfo.countryCode, loginInfo.phoneNumber, loginInfo.password)
            .then(res => {
                    // navigate('/');
                    //  eslint-disable-next-line react-hooks/exhaustive-deps
                    toast.success('Login successful.');
                    $("#loginContainer").slideUp("slow")

            })
            .catch(res => {
                    toast.error('Invalid Credentials. Please try again.');
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


            <button onClick={togglePanel}> Login</button>
                <div className={`${styles.panelWrap}`} style={ panelVisible ? divStyleOpen : divStyleClose}>
                <div className = {styles.panel}>

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
                            <span className={styles.noAccountText}>Dont have an account?</span> <span className={styles.signUpText}>Sign up now</span> 
                            </div>
                            


                            <div className={styles.signinFormContainer}>
                                <form onSubmit = {onSubmit}>
                                    <div className="">
                                        <label className={styles.phoneLabel}>Phone Number</label>
                                        <div className="input-group-sm  mb-3">
                                            <input type="text" className='form-control' id={styles.phonenuminput} required name="phoneNumber" placeholder="Email or phone number" aria-label="phoneNumber" 
                                            aria-describedby="inputGroup-sizing-small" 
                                            value = {loginInfo.phoneNumber}
                                            onChange = {handleChange}
                                            />
                                            <div>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                            <label>Password*</label>
                                            <input type= {"password"} name="password" required className="form-control" placeholder="Enter password" 
                                            value = {loginInfo.password}
                                            onChange = {handleChange}
                                            />
                                            {/* <span className='password-visibile-text'  Click={togglePasswordVisibility} > {isPasswordVisible? "hide": "show"}</span> */}
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


                    {/* <EnterOTP/> */}


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