import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import Qs from "qs";

import headerModules from "./modules/header.js";
import registModules from "./modules/regist.js";
import sohoModules from "./modules/soho.js";
import sohoEditModules from "./modules/soho_edit.js";
import sohoInfoModules from "./modules/sohoInfo.js";

Vue.prototype.$ajax = axios;
Vue.use(Qs);
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    country: [
      "基隆市",
      "台北市",
      "新北市",
      "桃園市",
      "新竹市",
      "新竹縣",
      "苗栗縣",
      "台中市",
      "彰化縣",
      "雲林縣",
      "嘉義市",
      "嘉義縣",
      "台南市",
      "高雄市",
      "屏東縣",
      "台東縣",
      "花蓮縣",
      "宜蘭縣",
      "南投縣",
      "澎湖縣",
    ],
  },
  getters: {},
  mutations: {
    token(state, val) {
      state.token = val;
    }
  },
  actions: {
    get_token({ commit }) {
      axios.post("/api/index.php?&m=Api&a=get_token", '').then((response) => {
        commit("token", response.data.data);
      });
    },
  },
  modules: {
    headerModules,
    registModules,
    sohoModules,
    sohoEditModules,
    sohoInfoModules,
  },
});
