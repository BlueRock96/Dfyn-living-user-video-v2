import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:7000'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.sendOtp = this.sendOtp.bind(this)
        this.verifyOtp = this.verifyOtp.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.resendOtp = this.resendOtp.bind(this);
    }


    sendOtp(phoneNumber, countryCode )
    {  
        //  console.log(phoneNumber,countryCode )
        return this.fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/resendotp`, {
            mode: 'cors', 
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                phone_number: phoneNumber,
                country_code: countryCode
              })
        }).then(res => { 
            // this.setToken(res.accessToken);
            return Promise.resolve(res);
        }).catch(res => { 
            // this.setToken(res.accessToken);
            return Promise.resolve(res);
        })
    }

    verifyOtp(phoneNumber, otp_string )
    {  
        return this.fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/verify_otp`, {
            mode: 'cors', 
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                phone_number: phoneNumber,
                otp: otp_string
              })
        }).then(res => { 
            return Promise.resolve(res);
        })
    }

    resendOtp(phoneNumber, country_code )
    {  
        //  console.log(phoneNumber,country_code )
        return this.fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/resendotp`, {
            mode: 'cors', 
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                phone_number: phoneNumber,
                country_code: country_code
              })
        }).then(res => { 
            return Promise.resolve(res);
        })
    }

 



    login(countryCode, phoneNumber, password) {
        // Get a token
        return this.fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/signin_user`, {
            mode: 'cors', 
            method: "POST",
            headers: {"Content-Type":"application/x-www-form-urlencoded"},
            body: new URLSearchParams({
                phone_number: phoneNumber,
                password: password,
                country_code: countryCode
              })
        }).then(res => { 
            // this.setToken(res.accessToken);
            return Promise.resolve(res);
        })
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken()
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            // return false;
            return true;
        }
    }

    setToken(response) {
        // Saves user token to localStorage
        // localStorage.setItem('_uToken', response.token);
        localStorage.setItem('_uToken', response);
    }

    setUserInfo(info){
        localStorage.setItem('_uInfo', info);
    }
    getUserInfo(){
        return JSON.parse(localStorage.getItem('_uInfo'))
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('_uToken')
    }

    logout() {
        // Clear user token and profile data from localStorage
        console.log('logout called');
        localStorage.removeItem('_uToken');
        localStorage.removeItem('_uInfo');
    }

    getProfile() {
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            // .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            console.log(response);
            var error = new Error(response.message)
            error.response = response
            throw error
        }
    }

}