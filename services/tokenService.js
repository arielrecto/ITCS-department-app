import * as SecureStore from 'expo-secure-store'


let token = null;


export const setToken = async (newToken) => {
    token = newToken
    
    if(token !== null){
        await SecureStore.setItemAsync('token', token)
    } else{
        await SecureStore.deleteItemAsync('token')
    }
}



export const getToken = async () => {

    if(token !== null){
        return token;
    }
    
    token = await SecureStore.getItemAsync('token');
}

