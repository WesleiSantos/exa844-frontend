const routes = [
  {
    path: "/",
    redirect: "/pagina-inicial",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // {
      //   path: "login",
      //   name: "home",
      //   component: () => import("pages/Login.vue"),
      //   meta: {
      //     title: "Login",
      //     subPage: true,
      //   },
      // },
      {
        path: "/pagina-inicial",
        name: "home",
        component: () => import("src/pages/IndexPage.vue"),
        meta: {
          title: "Login",
          subPage: true,
        },
      },
      {
        path: "/entrar",
        name: "login",
        component: () => import("src/pages/LoginPage.vue"),
        meta: {
          title: "Login",
          subPage: true,
        },
      },
      {
        path: "/cadastro",
        name: "register",
        component: () => import("src/pages/RegisterPage.vue"),
        meta: {
          title: "Cadastro",
          type: "admin",
          subPage: true,
        },
      },
      {
        path: "/cadastro-usuario",
        name: "register-user",
        component: () => import("src/pages/RegisterPage.vue"),
        meta: {
          title: "Cadastro",
          type: "user",
          subPage: true,
          requireAuth: true,
          userPermission: [1],
        },
      },
      {
        path: "/gerenciamento",
        name: "management",
        component: () => import("src/pages/Management.vue"),
        meta: {
          title: "Gerenciamento",
          subPage: true,
          requireAuth: true,
          userPermission: [1],
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
