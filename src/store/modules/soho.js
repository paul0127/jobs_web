import axios from "axios";

const state = {
  pageCount: 1,
  nowPage: 1,
  sohos: [],
};
const getters = {
  sohoslist: (state, getters, rootState) => {
    let re_sohos = [];
    state.sohos.forEach((item) => {
      let e =
        item.user_company === "0"
          ? item.user_nick.split("")
          : item.user_name.split("");
      let c = item.user_company === "1" ? "公司" : "個人";
      let n =
        item.user_company === "0" || item.user_companyid === null
          ? "未提供統編"
          : item.user_companyid;
      let name = item.user_company === "0" ? item.user_nick : item.user_name;
      let color = { "background-color": item.user_color };
      let sohocolor = { "background-color": item.soho_color };
      let country = rootState.country[item.user_country];
      let t = item.soho_tags !== "" ? item.soho_tags.split(",") : [];
      re_sohos.push({
        name_index: e[0],
        name,
        company: c,
        companyid: n,
        tags: t,
        country,
        color,
        sohocolor,
        ...item,
      });
    });
    let pageStart = state.pageCount * (state.nowPage - 1);
    let pageEnd = state.pageCount * state.nowPage;
    let re_sohos_list = re_sohos.slice(pageStart, pageEnd);

    return re_sohos_list;
  },
  sohospage: (state) => {
    let pager =
      state.sohos.length % state.pageCount
        ? Math.floor(state.sohos.length / state.pageCount) + 1
        : Math.floor(state.sohos.length / state.pageCount);
    return pager;
  },
};
const mutations = {
  sohosChange(state, soho) {
    state.sohos = soho;
  },
  pageChange(state, val) {
    state.nowPage = val;
  },
};
const actions = {
  sohoHandler({ commit }) {
    axios
      .get("/api/index.php?&m=Api&a=soho")
      .then((response) => {
        commit("sohosChange", response.data);
      });
  },
  pageHandler({ commit }, page) {
    commit("pageChange", page);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
