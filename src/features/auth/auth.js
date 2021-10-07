import { getCookie, setCookie } from '../../utils/cookies';



const auth = {
    login:(attributes,callback) => {
        setCookie("token", attributes.auth_token, 30);
        setCookie("role",attributes.role, 30);
        setCookie("userId", attributes.id, 30);
        callback();
    },

    logout:(callback) => {
        setCookie("token", "");
        setCookie("role", "");
        setCookie("userId", "",)
        callback();
    },

    isAuthenticated:(callback) => {
        return getCookie("token") && true;
    }
}


export default auth;