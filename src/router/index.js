import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "sid",
    component: () => import('@/views/sid'),
    redirect: '/home',
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import('@/views/home'),
      },
      {
        path: "/details/:id",
        name: "details",
        component: () => import('@/views/detailss')
      },
      {
        path: "/individual",
        name: "individual",
        component: () => import('@/views/individual')
      },
      {
        path: "/notice",
        name: "notice",
        component: () => import('@/views/notice')
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
