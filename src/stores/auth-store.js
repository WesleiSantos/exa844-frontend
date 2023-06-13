import { defineStore } from "pinia";
import { api } from "boot/axios";
import { Loading, Notify } from "quasar";

export const authStore = defineStore("auth", {
  state: () => ({
    // USER DATA
    userLogged: false,
    user: {},
    token: null,
  }),
  persist: true,
  getters: {},
  actions: {
    login(user) {
      return new Promise((resolve, reject) => {
        api
          .post("login", user)
          .then(({ data }) => {
            console.log(data);
            const token = data.access_token;
            const user = data.user;

            console.log(token, user);
            this.DEFINE_USER_LOGGED({
              token: token,
              user: user,
              isLogged: true,
            });
            api.defaults.headers.common["Authorization"] = `Bearer ${
              token || ""
            }`;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    async logout() {
      const res =
        (await new Promise()) <
        boolean >
        ((resolve, reject) => {
          Loading.show();
          api
            .post("logout")
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              Notify.create({
                message: error?.response?.data?.message ?? "Erro ao sair",
              });
              reject(false);
            })
            .finally(() => {
              this.$reset();
              Loading.hide();
            });
        });
      return res;
    },
    DEFINE_USER_LOGGED({ token, user, isLogged }) {
      this.token = token;
      this.user = user;
      this.userLogged = isLogged;
    },
    CHANGE_USER(user) {
      this.user = user;
    },
    SET_PHOTO(entity) {
      if (this.entity) this.entity.url_logo = entity.url_logo;
    },
  },
});
