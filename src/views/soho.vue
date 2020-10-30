<template>
  <section class="soho">
    <div class="container">
      <div class="row">
        <div
          v-for="(soho, index) in sohos_list"
          class="col-md-3 col-sm-12"
          :key="index"
        >
          <div class="soho_item">
            <div class="soho_top">
              <label :style="soho.color">{{ soho.name_index }}</label>
              <div class="soho_top_title">
                <h1>{{ soho.name }}</h1>
                <span
                  >{{ soho.company
                  }}<template v-if="soho.user_company == '1'"
                    >．{{ soho.companyid }}</template
                  >．{{ soho.country }}</span
                >
              </div>
            </div>
            <div class="soho_middle" :style="soho.sohocolor">
              <div class="soho_middle_text">{{ soho.soho_desc }}</div>
            </div>
            <div class="soho_bottom">
              <h1>
                <router-link
                  :to="{ name: 'sohoInfo', params: { id: soho.soho_id } }"
                  >{{ soho.soho_name }}</router-link
                >
              </h1>
              <div class="soho_tag">
                <a v-for="(tag, index) in soho.tags" :key="index">{{ tag }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pager">
        <ul class="pagination">
          <li class="page-item" v-for="(p, index) in pager" :key="index">
            <router-link
              class="page-link"
              :to="{ name: 'soho', query: { p: p } }"
              >{{ p }}</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import store from "@/store/index.js";

export default {
  name: "sohoBlock",
  computed: {
    sohos_list() {
      return this.$store.getters["sohoModules/sohoslist"];
    },
    pager() {
      return this.$store.getters["sohoModules/sohospage"];
    },
  },
  mounted() {
    store.dispatch("sohoModules/sohoHandler");

    let page = this.$route.query.p ? parseInt(this.$route.query.p) : 1;
    store.dispatch("sohoModules/pageHandler", page);
  },
  watch: {
    $route() {
      let page = this.$route.query.p;
      page = !page ? 1:page
      store.dispatch("sohoModules/pageHandler", page);
    },
  },
};
</script>

<style scoped>
.soho {
}
.soho .soho_item {
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
.soho .soho_item .soho_top {
  display: flex;
  padding: 0.75rem;
}
.soho .soho_item .soho_top label {
  background-color: #000;
  color: #fff;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.soho .soho_item .soho_top .soho_top_title {
  margin-left: 0.75rem;
}
.soho .soho_item .soho_top .soho_top_title h1 {
  font-size: 0.85rem;
  margin-bottom: 0;
}
.soho .soho_item .soho_top .soho_top_title span {
  font-size: 0.85rem;
}
.soho .soho_item .soho_middle {
  padding-bottom: 75%;
  height: 0;
  background-color: #243639;
  color: #fff;
  position: relative;
}
.soho .soho_item .soho_middle .soho_middle_text {
  position: absolute;
  width: 100%;
  height: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  top: 10%;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  text-align: center;
}
.soho .soho_item .soho_bottom {
  padding: 0.5rem 0.75rem;
  min-height: 140px;
}
.soho .soho_item .soho_bottom h1 {
  font-size: 1.1rem;
  font-weight: 100;
  line-height: 1.5;
}
.soho .soho_item .soho_bottom .soho_tag a {
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 8px;
  margin: 0 5px 5px 0;
}
</style>
