import axios from "axios";

const state = {
  soho: {},
};
const getters = {
  sohoInfo: (state, getters, rootState) => {
    //let name = state.soho.user_company === "0" ? state.soho.user_nick : state.user_name;
    let c = state.soho.soho_country ? state.soho.soho_country : [];
    let country = [];
    if (c.length == rootState.country.length) {
      country.push("無限制");
    } else {
      c.forEach((item) => {
        country.push(rootState.country[item]);
      });
    }

    return { country, ...state.soho };
  },
};
const mutations = {
  sohosChange(state, soho) {
    state.soho = soho;
  },
};
const actions = {
  sohoHandler({ commit }, id) {
    axios
      .get("/api/index.php?&m=Api&a=soho", {
        params: {
          ID: id,
        },
      })
      .then((response) => {
        let data = { ...response.data };
        data["soho_country"] = JSON.parse(data["soho_country"]);
        data["soho_more"] = data["soho_more"].split(",");
        commit("sohosChange", data);
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
