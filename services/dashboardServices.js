import { getToken } from "./tokenService";
import axios from './../utils/axios'


export async function getData() {

    try {

        const token = await getToken();
    
        const  {data} = await axios.get('/dashboard', {
            headers : {
                Authorization : `Bearer ${token}`
            }
        });

        return data;

    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}