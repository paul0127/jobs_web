import axios from "axios";
import Qs from "qs";
import store from "@/store/index.js";

const state = {islogin: false,};
const getters = {};
const mutations = {
  isloginChange(state, val) {
    state.islogin = val;
  },
};
const actions = {
  sohoAdd({ commit },val) {
    let tags = val.tags == null ? [] : val.tags.join(",");
    let more = val.more == null ? [] : val.more.join(",");
    let data = {
      soho: {
        user_id: val.user_id,
        soho_name: val.name,
        soho_country: JSON.stringify(val.local),
        soho_price: val.ptice,
        soho_unit: val.unit,
        soho_desc: val.desc,
        soho_tags: tags,
        soho_more: more,
        soho_work: val.work,
        soho_cert: JSON.stringify(val.cert),
        soho_award: JSON.stringify(val.award),
      },
    };
    return axios
      .post(
        "/api/index.php?&m=Api&a=sohoAdd",
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
          commit("isloginChange", true);
          return true;
        } else {
          return false;
        }
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
