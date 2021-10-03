import { fetchAuth } from '../features/auth/authSlice';
import { getCookie, setCookie } from '../utils/cookies';


class Auth {
        constructor() {
            this.authenticated = false;
        }

        login(token, callback) {
            setCookie("token", token, 30);
            console.log(callback)
            callback();
        }

        logout() {
            this.authenticated = false;
        }

        isAuthenticated() {
            return this.authenticated;
        }
    }

export default new Auth()