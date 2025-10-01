import { httpClient } from "../../Utils/interceptor";

export const deleteUserAPIbyID = async (id) => {
  return await httpClient.delete(`/api/users?id=${id}`, id);
};
export const UpdateUserAPI = async (data, id) => {
  return await httpClient.put(`/api/users/${id}`, data);
};

export const CreateUserAPI = async (data) => {
  return await httpClient.post("/api/users", data);
};
