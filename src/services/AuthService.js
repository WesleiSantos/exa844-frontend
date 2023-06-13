import { api } from "../boot/axios";

export default {
  registerUser: (user) => {
    return api.post(`/register`, user);
  },

  loginUser: (user) => {
    return api.post(`/login`, user);
  }
};
