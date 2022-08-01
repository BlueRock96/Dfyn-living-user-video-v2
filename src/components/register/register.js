import React, {useState, useEffect} from 'react'
import styles from './register.module.css'
import AuthService from '../authServices/AuthService';
import { toast } from 'react-toastify';
import validator from 'validator';
const Auth = new AuthService();

const Register = ({backToLoginPage, togglePanel}) => {
    const [userInfo, setUserInfo] = useState({full_name: "", phone_number: "", email_id: "", password: "", confirmPassword: "",  is_term_accepted: "1", dialCode: "+91", country_code: "+91" })

    const handleChange =  (event) => {
        var { name, value } = event.target;
        if ( name === 'phone_number'){
          if(value.length !== 0){
              if(( !validator.isNumeric(value, {no_symbols: true}) || value.length > 10))
                return            
            }
          }
        setUserInfo(userInfo => ({
            ...userInfo,
            [name]: value
        }));
    } 

 

      const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!validator.isEmail(userInfo.email_id)) {
          toast.error('Invalid Email'); return;
        }
        if (!validator.isMobilePhone(userInfo.phone_number,['en-IN'])) {
          toast.error('Invalid Phone number'); return
        }

        if(!validator.isAlpha(userInfo.full_name, ['en-US'], {'ignore':  " -"})){
          toast.error('Invalid name'); return
        }
        if(userInfo.password !== userInfo.confirmPassword){
          toast.error('Passwords donot match'); return;
        }
        if(userInfo.password.length < 8 ){
          toast.error('Password should be atleast 8 characters'); return;
        }


        try{

        const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/signup_user`,{
          mode: 'cors', 
          method: "POST",
          headers: {"Content-Type":"application/x-www-form-urlencoded"},
          body:new URLSearchParams({
            full_name: userInfo.full_name,
            email_id: userInfo.email_id,
            phone_number: userInfo.phone_number,
            password: userInfo.password,
            is_term_accepted: userInfo.is_term_accepted,
            dialCode: userInfo.dialCode,
            country_code: userInfo.country_code
          })
        })
      
        const parseRes =   await response.json()
        // console.log(response);
        if(response.status === 200){
          toast.success('Registered successfully. Please login to continue');
                    setUserInfo({full_name: "", phone_number: "", email_id: "", password: "", confirmPassword: "",  is_term_accepted: "1", dialCode: "+91", country_code: "+91" });
                    backToLoginPage();
                    togglePanel();
        }else{
          toast.error(parseRes.message);
        }              
      }
      catch(error){
        console.log(error);
      }

      }

  


    return (
        <>
            
            <div className ={styles.registerContainer}>
               
                <span className={styles.signinTextTitle}>Register</span> 
                <span className={styles.subtitle}>Register now to unlock all features.</span> 
                <div className="mt-5">
                    <form action="/" className="mt-4" onSubmit={handleSubmit}>

                    <div className={styles.inputGroup}>
                          <label className={styles.label}>Full Name</label>
                          <div className="input-group-sm">
                              <input type="text" className={`form-control ${styles.inputField}`} required 
                              name="full_name" placeholder="John Doe" aria-label="full_name" 
                              aria-describedby="inputGroup-sizing-small" 
                              value = {userInfo.full_name}
                              onChange = {handleChange}
                              />
                          </div>
                    </div>

                    <div className={styles.inputGroup}>
                          <label className={styles.label}>Phone Number</label>
                          <div className="input-group-sm">
                              <input type="number" className={`form-control ${styles.inputField}`} required 
                              name="phone_number" placeholder="98XXXXXX71" aria-label="phone_number" 
                              aria-describedby="inputGroup-sizing-small" 
                              value = {userInfo.phone_number}
                              onChange = {handleChange}
                              />
                          </div>
                    </div>

                    <div className={styles.inputGroup}>
                          <label className={styles.label}>E Mail</label>
                          <div className="input-group-sm">
                              <input type="text" className={`form-control ${styles.inputField}`} required 
                              name="email_id" placeholder="yourname@example.com" aria-label="email_id" 
                              aria-describedby="inputGroup-sizing-small" 
                              value = {userInfo.email_id}
                              onChange = {handleChange}
                              />
                          </div>
                    </div>

                    <div className={styles.inputGroup}>
                          <label className={styles.label}>Password</label>
                          <div className="input-group-sm">
                              <input type="password" className={`form-control ${styles.inputField}`} required 
                              name="password" placeholder="********" aria-label="password" 
                              aria-describedby="inputGroup-sizing-small" 
                              value = {userInfo.password}
                              onChange = {handleChange}
                              />
                          </div>
                    </div>

                    <div className={styles.inputGroup}>
                          <label className={styles.label}>Confirm Password</label>
                          <div className="input-group-sm">
                              <input type="password" className={`form-control ${styles.inputField}`} required 
                              name="confirmPassword" placeholder="********" aria-label="confirmPassword" 
                              aria-describedby="inputGroup-sizing-small" 
                              value = {userInfo.confirmPassword}
                              onChange = {handleChange}
                              />
                          </div>
                    </div>

                        <button type="submit" className={`btn form-control mt-5 ${styles.submitbtn}`} >
                            Register 
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default Register