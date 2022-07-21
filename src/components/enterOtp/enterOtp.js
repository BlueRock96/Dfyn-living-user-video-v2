import React, {useState, useEffect} from 'react'
import styles from './enterOtp.module.css'

const EnterOTP = () => {
    const [otp, setOtp] = useState({otp1: "6", otp2: "6", otp3: "6", otp4: "3"});
    const [timer, setTimer] = useState(6);
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
        console.log(otp);
        startCountdown();
      }

      const startCountdown = (e) =>{
       
        setIsActive(true);
      } 

      useEffect(() => {
        let   timerInt  = null;
        if(timer === 0 ){ console.log(timer); clearInterval(timer);  setIsActive(false);}

        if(isActive){
          timerInt = setInterval(() => {
            // setTimer(timer - 1);
            setTimer(timer - 1)
            if(timer === 0 ){ console.log(timer); clearInterval(timer);  setIsActive(false);}
          }, 1000);
        }
        return () => {
          clearInterval(timerInt);
        };
      });


    return (
        <>
            <div>
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
                            <span className={styles.timer}>00:{timer}</span> <span className={styles.resendOtpText}>Resend</span>
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