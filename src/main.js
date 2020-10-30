import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

router.beforeEach((to, from, next) => {
  const u_id = localStorage.getItem("u_id");
  console.log(to)
  console.log(u_id)
  if (to.meta.requireAuth) {
    if (u_id) {
      next();
    }else{
      alert('請先登入會員')
      next({
        path:'/login'
      })
    }
  }else{
    next()
  }
});

