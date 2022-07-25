import React, {useState, useEffect} from 'react'
import styles from './enterOtp.module.css'
import AuthService from '../authServices/AuthService';
import { toast } from 'react-toastify';
const Auth = new AuthService();

const EnterOTP = ({phoneNumber, togglePanel}) => {
    const [otp, setOtp] = useState({otp1: "", otp2: "", otp3: "", otp4: ""});
    const [timer, setTimer] = useState(30);
    const [countryCode] = useState('+91'); 
    const handleChange =  (event) => {
        var { name, value } = event.target;
        value = value.replace(/[^0-9]/g,'');
        setOtp(otp => ({
            ...otp,
            [name]: value
        }));
    } 
    const [isActive, setIsActive] = useState(false);

    const inputFocus =  (elmnt) => {
            if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
                const next = elmnt.target.tabIndex - 2;
                if (next > -1) {
                  elmnt.target.form.elements[next].focus()
                }
              }
            else {
                if(elmnt.target.value){
                    const next = elmnt.target.tabIndex;
                    if (next < 5) {
                        elmnt.target.form.elements[next].focus()
                    }
                }      
            }
      }

      const handleSubmit = (e) =>{
        e.preventDefault();

          Auth.verifyOtp( phoneNumber, otp.otp1 + otp.otp2 + otp.otp3 + otp.otp4 )
            .then(res => {
                console.log(res);
                if(res.status !== false){
                  toast.success('Logged in successfully');
                    //set access token , and user name and login
                    console.log(res.accessToken);
                    Auth.setToken(res.accessToken)
                    Auth.setUserInfo(JSON.stringify(res.app_user));
                    console.log(Auth.getUserInfo());
                    // SHow username at the top 
                  
                    togglePanel();
                    

                } else{
                    toast.error('Invalid OTP. Please try again.');
                    setOtp({otp1: "", otp2: "", otp3: "", otp4: ""});
                }
            })
            .catch(res => {
                    toast.error('Something went wrong. Please try again.');
            })
      }

      const startCountdown = (e) =>{
        setIsActive(true);
      } 

      const resendOTP = () =>{
        setTimer(30)
        Auth.resendOtp( phoneNumber,  countryCode)
        .then(res => {
            console.log(res);
            if(res.status !== false){
              //count down 
              startCountdown();

              //disable button
              toast.info('Please check your phone for OTP.');

            } else{
                toast.error(res.message);
            }
        })
        .catch(res => {
                toast.error('Something went wrong. Please try again.');
        })
      }


      useEffect(() => {
        let   timerInt  = null;
        if(timer === 0 ){ console.log(timer); clearInterval(timer);  setIsActive(false); setTimer(30)}

        if(isActive){
          timerInt = setInterval(() => {
            // setTimer(timer - 1);
            setTimer(timer - 1)
            if(timer === 0 ){ console.log(timer); clearInterval(timer);  setIsActive(false);setTimer(30)}
          }, 1000);
        }
        return () => {
          clearInterval(timerInt);
        };
      }, [isActive, timer, otp]);




    return (
        <>
            
            <div className ={styles.otpContainer}>
               
                <span className={styles.signinTextTitle}>Enter OTP</span> 
                <span className={styles.otpSubtitle}>You have received 4-digit OTP in your mobile number.</span> 
                <div className="mt-5">
                    <form action="/" className="mt-4" onSubmit={handleSubmit}>
                        <input name="otp1" required tabIndex="1" value = {otp.otp1} className={styles.otp} type="text" onChange = {handleChange}  onKeyUp={inputFocus} maxLength={1} />
                        <input name="otp2" required tabIndex="2" value = {otp.otp2} className={styles.otp} type="text" onChange = {handleChange}  onKeyUp={inputFocus} maxLength={1} />
                        <input name="otp3" required tabIndex="3" value = {otp.otp3} className={styles.otp} type="text" onChange = {handleChange}  onKeyUp={inputFocus} maxLength={1} />
                        <input name="otp4" required tabIndex="4" value = {otp.otp4} className={styles.otp} type="text" onChange = {handleChange}  onKeyUp={inputFocus} maxLength={1} />
                        <div className='mt-2'>
                            <span className={styles.otpSubtitle}>Didn’t get OTP?</span> &nbsp;
                            {isActive ?
                              <span className={styles.timer}>00:{timer}</span> 
                            : <span className={styles.resendOtpText} onClick = {resendOTP}> Resend</span>
                            }
                        </div>
                        <button type="submit" className={`btn form-control mt-5 ${styles.submitbtn}`} >
                            Continue 
                        </button>

                        {/* Seconds: {seconds} */}


                    </form>
                </div>
            </div>
        </>
    )
}

export default EnterOTP