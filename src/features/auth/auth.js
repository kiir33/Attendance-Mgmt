import { getCookie, setCookie } from '../../utils/cookies';



const auth = {
    login:(token, callback) => {
        setCookie("token", token, 30);
        callback();
    },

    logout:(callback) => {
        setCookie("token", "");
        callback();
    },

    isAuthenticated:(callback) => {
        return getCookie("token") && true;
    }
}


export default auth;