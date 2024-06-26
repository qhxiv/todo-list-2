import axios from "axios";
import { API } from "./apiUrl";

export async function getGroups() {
  const res = await axios.get(`${API}/groups`);
  return res.data;
}

export async function getGroup(id) {
  const res = await axios.get(`${API}/groups/${id}`);
  return res.data;
}

export async function createGroup(newGroup) {
  const res = await axios.post(`${API}/groups`, newGroup);
  return res.data;
}

export async function deleteGroup(id) {
  await axios.delete(`${API}/groups/${id}`);
  return null;
}

export async function renameGroup(id, newGroup) {
  await axios.put(`${API}/groups/${id}`, newGroup);
  return null;
}
