import axios from "../utils/axios";
import { getToken } from "./tokenService";

export async function getAttendance(id) {
    const token = await getToken();
  
    const { data: attendances } = await axios.get(`/attendances`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    return attendances;
  }