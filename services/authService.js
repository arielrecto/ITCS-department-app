import axios from "./../utils/axios";
import { getToken, setToken } from "./../services/tokenService";
import AuthContext from "../contexts/AuthContext";

export async function login(credentials) {
  const { data } = await axios.post("/login", credentials);


   
  await setToken(data.token);
  
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
