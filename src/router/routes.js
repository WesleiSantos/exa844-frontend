const routes = [
  {
    path: "/",
    redirect: "/pagina-inicial",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "pagina-inicial",
        name: "home",
        component: () => import("pages/IndexPage.vue"),
        meta: {
          title: "Página Inicial",
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
