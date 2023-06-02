const routes = [
  {
    path: "/",
    redirect: "/login",
    component: () => import("layouts/FullPage.vue"),
    children: [
      {
        path: "login",
        name: "home",
        component: () => import("pages/Login.vue"),
        meta: {
          title: "Login",
          subPage: true,
        },
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
