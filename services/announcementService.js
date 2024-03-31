import axios from "../utils/axios";
import { getToken } from "./tokenService";

export async function getAnnouncementList() {
  const token = await getToken();

  const { data: announcements } = await axios.get(`/announcements`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return announcements;
}

export async function getAnnouncement(id) {
  const token = await getToken();

  const { data: announcements } = await axios.get(`/announcements/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return announcements;
}
