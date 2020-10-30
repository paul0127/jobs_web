import axios from "axios";
import Qs from "qs";
import router from '@/router'
import store from "@/store/index.js";

const state = {
  userInput: {
    email: "",
    password: "",
  },
};
const mutations = {
  registChange(state, val) {
    state.regist = val;
  },
};
const actions = {
  registHandler({ commit }, res) {
    let data = {
      user: {
        user_nick: res.nick,
        user_name: res.name,
        user_password: res.password,
        user_mail: res.email,
        user_country: res.local,
        user_company: res.corp,
        user_sex: res.sex,
        user_birth: res.birthday,
        user_companyid: res.campanyID,
      },
    };

    let user = "";
    axios
      .post(
        "http://laravel.e-office.tw/index.php?&m=Api&a=regist",
        Qs.stringify(data),
        {
          headers:{
            token:'pw'+store.state.token
          }
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.info === "succ") {
          user = response.data.data;
          if (response.data.data.user_company == "0") {
            user.name_index = response.data.data.user_nick.split("")[0];
          } else {
            user.name_index = response.data.data.user_name.split("")[0];
          }

          user.color = { "background-color": response.data.data.user_color };
          commit("headerModules/userChange", user, { root: true });
          commit("headerModules/isloginChange", true, { root: true });
          localStorage.removeItem("u_id");
          localStorage.setItem("u_id", response.data.data.user_number);
          router.push({ path: "soho" });
          // window.location.href = "/index.html";
        } else {
          alert(response.data.data);
        }
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
