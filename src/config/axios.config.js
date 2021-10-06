import axios from "axios";
import { getCookie } from "../utils/cookies";

const axiosInstance = axios.create({
    baseURL: "https://nameless-sands-43248.herokuapp.com/api/v1/",
})

export {axiosInstance};