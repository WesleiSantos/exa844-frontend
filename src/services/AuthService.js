import { api } from "../boot/axios";
import { authStore as useAuthStore } from "stores/auth-store";
const authStore = useAuthStore();

export default {
  registerUser: (user) => {
    return api.post(`/register`, user);
  },

  createUser: (user) => {
    console.log(`Bearer ${authStore.token}`);
    return api.post(`/create`, user);
  },

  loginUser: (user) => {
    return api.post(`/login`, user);
  },
};
