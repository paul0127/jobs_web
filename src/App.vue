<template>
  <div id="app">
    <header-block></header-block>
    <router-view></router-view>
  </div>
</template>


<script>
import headerBlock from './components/header/template.vue'
import store from "@/store/index.js";
export default {
  components: {
    "header-block": headerBlock,
  },
  mounted() {
      store.dispatch('get_token')
  }
};
</script>
