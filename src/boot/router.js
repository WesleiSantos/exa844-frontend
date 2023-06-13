import { boot } from "quasar/wrappers";
import { useRouter } from "vue-router";
let routerInstance = useRouter();
import { authStore as useAuthStore } from "stores/auth-store";
import { api } from "boot/axios";

export default boot(({ router }) => {
  // something to do
  routerInstance = router;
  const authStore = useAuthStore();
  api.defaults.headers.common["Authorization"] = `Bearer ${
    authStore.token || ""
  }`;
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some((record) => record.meta.requireAuth) &&
      !authStore.$state.userLogged
    ) {
      next({ name: "home" });
    } else if (
      to.meta.userPermission &&
      !to.meta.userPermission?.some(
        (permission) => permission === parseInt(authStore.user.role[0].id)
      )
    ) {
      next({ name: "home" });
    } else {
      next();
    }
  });
});
export { routerInstance };
