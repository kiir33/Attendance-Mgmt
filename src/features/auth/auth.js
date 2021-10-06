import { getCookie, setCookie } from '../../utils/cookies';



const auth = {
    login:(token,role, callback) => {
        setCookie("token", token, 30);
        setCookie("role",role, 30);
        callback();
    },

    logout:(callback) => {
        setCookie("token", "");
        setCookie("role", "");
        callback();
    },

    isAuthenticated:(callback) => {
        return getCookie("token") && true;
    }
}


export default auth;