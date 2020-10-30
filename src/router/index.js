import Vue from "vue";
import VueRouter from "vue-router";
import regist from "@/views/regist.vue";
import soho from "@/views/soho.vue";
import sohoInfo from "@/views/sohoInfo.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/soho" },
  {
    path: "/regist",
    meta:{requireAuth:false},
    component: regist,
  },
  {
    path: "/soho",
    name: "soho",
    meta:{requireAuth:false},
    component: soho,
  },
  {
    path: "/soho/:id",
    name: "sohoInfo",
    meta:{requireAuth:false},
    component: sohoInfo,
  },
  {
    path: "/user/soho_add",
    name: "soho_add",
    meta:{requireAuth:true},
    component: () => import("@/views/sohoEdit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
