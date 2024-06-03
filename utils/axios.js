import axiosLib from "axios";



const axios = axiosLib.create({
    // baseURL : 'http://192.168.1.8:8000/api/mobile',
     baseURL : 'https://live.itcsdept.com/api/mobile',
    headers : {
        Accept : "application/json"
    }
})


export default axios