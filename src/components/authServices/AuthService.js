import decode from 'jwt-decode';
export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:7000'
        this.fetch = this.fetch.bind(this)
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
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
            this.setToken(res.accessToken);
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

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('_uToken')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('_uToken');
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
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }
}