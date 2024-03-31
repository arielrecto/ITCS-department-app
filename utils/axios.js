import axiosLib from "axios";



const axios = axiosLib.create({
    baseURL : 'https://live.itcsdept.com/api/mobile',
    headers : {
        Accept : "application/json"
    }
})


export default axios