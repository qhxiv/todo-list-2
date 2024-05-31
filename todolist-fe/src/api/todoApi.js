import axios from "axios";
import { API } from "./apiUrl";

export async function getTodosOfAGroup(id) {
  const res = await axios.get(`${API}/groups/${id}/todos`);
  return res.data;
}

export async function updateTodo(groupId, todoId, updatedTodo) {
  await axios.put(`${API}/groups/${groupId}/todos/${todoId}`, updatedTodo);
  return null;
}

export async function deleteTodo(id) {
  await axios.delete(`${API}/todos/${id}`);
  return null;
}

export async function createTodo(groupId, newTodo) {
  const res = await axios.post(`${API}/groups/${groupId}`, newTodo);
  return res.data;
}