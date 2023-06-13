import { api } from "../boot/axios";
import { authStore as useAuthStore } from "stores/auth-store";
const authStore = useAuthStore();

export default {
  registerUser: (user) => {
    return api.post(`/register`, user);
  },

  createUser: (user) => {
    return api.post(`/create`, user);
  },

  loginUser: (user) => {
    return api.post(`/login`, user);
  },

  getUsers: () => {
    return api.get(`/user`);
  },

  getUser: (id) => {
    return api.get(`/user/${id}`);
  },

  updateUser: (user) => {
    return api.put('update', user)
  },

  deleteUser: (id) => {
    return api.delete(`/user/${id}`);
  },

  logout: () => {
    return api.post(`/logout`);
  },
};
