import axios from './../utils/axios'
import { getToken } from './tokenService'


export async function getEventList (){

    const token = await getToken();

    const { data : events } = await axios.get('/event',{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    return events;
}


export async function getEventData(id) {
    const token = await getToken();

    const { data : event } = await axios.get(`/event/${id}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    return event;
}


export async function submitEventEvaluation (ref, data){
    const token = await getToken();



    const {data : message} =  await axios.post(`/event/rf=${ref}/evaluation`, data, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })


    return message;
}


export async function attendance(ref){
    const token = await getToken();


    const data = {
        'sample' : 'hello'
    }

    const {data : message} =  await axios.post(`/event/rf=${ref}/attendance`, data, {
        headers : {
            Authorization : `Bearer ${token}`
        }
    })


    return message;
}