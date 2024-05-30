import axios from "axios";
import { API } from "./apiUtils";

export async function getGroups() {
  const res = await axios.get(`${API}/groups`);
  return res.data;
}

export async function putGroup(name, id) {
  const updatedGroup = { Name: name };
  
  const res = await axios.post(`${API}/groups/${id}`, updatedGroup);
  return res;
}