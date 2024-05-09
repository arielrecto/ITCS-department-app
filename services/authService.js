import axios from "./../utils/axios";
import { getToken, setToken } from "./../services/tokenService";
import AuthContext from "../contexts/AuthContext";

export async function login(credentials) {
  const { data } = await axios.post("/login", credentials);


   
  await setToken(data.token);

  return data;
  
}

export async function loadUser() {
  const token = await getToken();

  const { data } = await axios.get("/loadUser", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.user;
}

export async function logout() {
  const token = await getToken();

  const { data: message } = await axios.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );


  await setToken(null)
  return message;
}

export async function getCourses(){
  
  const { data } = await axios.get('/course');


  return data;

}


export async function getCoursesSection(course){
  
  const { data } = await axios.get(`/course/${course}/sections`);


  return data;

}


export async function forgotPassword(_email){

  const { data } = await axios.post(`/forgot-password`, _email);

}