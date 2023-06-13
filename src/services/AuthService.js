import { api } from "../boot/axios";

export default {
  registerUser: (user) => {
    return api.post(`/register`, user);
  },

  registerUserType: (user) => {
    return api.post(`/create`, user);
  },

  loginUser: (user) => {
    return api.post(`/login`, user);
  },

  getUsers: () => {
    return api.get(`/user`);
  },
};
