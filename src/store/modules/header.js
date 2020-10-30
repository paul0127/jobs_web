import axios from "axios";
import Qs from "qs";
import store from "@/store/index.js";

const state = {
  user: {},
  islogin: false,
};
const mutations = {
  userChange(state, user) {
    state.user = user;
  },
  isloginChange(state, val) {
    state.islogin = val;
  },
};
const actions = {
  loginHandler({ commit }, val) {
    let user = "";
    let data = {
      email: val.email,
      password: val.password,
    };
    return axios
      .post(
        "/api/index.php?&m=Api&a=login",
        Qs.stringify(data),
        {
          headers:{
            token:'pw'+store.state.token
          }
        }
      )
      .then((response) => {
        if (response.data.info === "succ") {
          user = response.data.data;
          if (response.data.data.user_company == 0) {
            user.name_index = response.data.data.user_nick.split("")[0];
          } else {
            user.name_index = response.data.data.user_name.split("")[0];
          }
          commit("isloginChange", true);
          commit("userChange", user);
          localStorage.setItem("u_id", user.user_number);
          alert("登入成功");
          return true;
        } else {
          alert("email、密碼輸入錯誤或查無此帳號");
          return false;
        }
      });
  },
  logoutHandler({ commit }) {
    localStorage.removeItem("u_id");
    commit("isloginChange", false);
    commit("userChange", {});
    alert("登出成功");
  },
  checkuserHandler({ commit }) {
    let u_id = localStorage.getItem("u_id");
    if (u_id == null) {
      return;
    }
    let data = { u_id };
    axios
      .post(
        "/api/index.php?&m=Api&a=islogin",
        Qs.stringify(data),
        {
          headers:{
            token:'pw'+store.state.token
          }
        }
      )
      .then((response) => {
        if (response.data.info === "succ") {
          let user = {};
          user = response.data.data;
          if (response.data.data.user_company == 0) {
            user.name_index = response.data.data.user_nick.split("")[0];
          } else {
            user.name_index = response.data.data.user_name.split("")[0];
          }
          commit("userChange", user);
          commit("isloginChange", true);
        }
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
