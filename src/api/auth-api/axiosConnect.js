import axios from "axios";


const axiosInstance = axios.create( {

     baseURL: "https://json-server-api-m161.onrender.com",
     headers:  { 
        "Content-Type": "application/json",
     },
     timeout: 20000,

});
export default axiosInstance;

