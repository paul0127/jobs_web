<template>
  <header class="header_area">
    <div class="container">
      <div class="menuarea">
        <div class="logoarea">
          <router-link to="/">JOBS</router-link>
        </div>
        <div class="main-menu">
          <ul
            class="nav clearfix"
            itemscope
            itemtype="http://www.schema.org/SiteNavigationElement"
          >
            <li class="menudown" itemprop="name">
              <router-link to="/soho">找人才</router-link>
            </li>
            <li class="menudown" itemprop="name">
              <router-link to="/case">找案件</router-link>
            </li>
            <li class="menudown" itemprop="name">
              <router-link to="/job">找職缺</router-link>
            </li>
          </ul>
        </div>
        <div class="user_top" v-if="isLogin">
          <i class="fas fa-user" @click="open_user"></i>
          <div class="user_popup" :class="user_popup">
            <div class="user_top">
              <label v-color="userInfo.user_color">{{
                userInfo.name_index
              }}</label>
              <div class="user_top_title">
                <h1>{{ userInfo.name }}</h1>
                <span>編輯你的資料</span>
              </div>
            </div>
            <div class="user_middle">
              <div class="user_list">
                自我介紹管理
              </div>
              <div class="user_list">
                <router-link
                  :to="{
                    name: 'soho_add',
                    params: { user_number: userInfo.user_number },
                  }"
                  >案件管理</router-link
                >
              </div>
              <div class="user_list">
                職缺管理
              </div>
            </div>
            <div class="user_bottom">
              <div class="user_list">
                <span @click.prevent="logout">登出</span>
              </div>
            </div>
          </div>
        </div>
        <div class="login" v-if="!isLogin">
          <i class="fas fa-user-friends" @click="open_login"></i>
          <div class="login_popup" :class="login_popup">
            <div class="login_list">
              <input
                type="text"
                value=""
                v-model="userInput.email"
                @keydown.enter="login"
                placeholder="輸入信箱"
              />
            </div>
            <div class="login_list">
              <input
                type="password"
                value=""
                v-model="userInput.password"
                @keydown.enter="login"
                placeholder="輸入密碼"
              />
            </div>
            <div class="login_list" @click="login" >
              <i class="fas fa-sign-in-alt"></i> 登入
            </div>
            <div class="login_list">
              <i class="far fa-question-circle"></i> 忘記密碼
            </div>
            <div class="login_bottom">
              <router-link to="/regist">前往註冊</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import store from "@/store/index.js";
export default {
  name: "headerBlock",
  store,
  data() {
    return {
      login_popup: { active: 0 },
      user_popup: { active: 0 },
      userInput: {
        email: "",
        password: "",
      },
    };
  },
  directives: {
    color: {
      bind: function(el, binding) {
        el.style.background = binding.value;
      },
    },
  },
  computed: {
    userInfo() {
      let user = this.$store.state.headerModules.user;
      if (user.user_company == 0) {
        user.name = user.user_nick;
      } else {
        user.name = user.user_name;
      }
      return this.$store.state.headerModules.user;
    },
    isLogin() {
      return this.$store.state.headerModules.islogin;
    },
  },
  methods: {
    open_login() {
      this.login_popup["active"] = !this.login_popup["active"];
    },
    open_user() {
      this.user_popup["active"] = !this.user_popup["active"];
    },
    login() {
      if (this.userInput.email == "" || this.userInput.password == "") {
        alert("請輸入信箱和密碼");
        return false;
      }
      store
        .dispatch("headerModules/loginHandler", this.userInput)
        .then((res) => {
          if (res == true) {
            this.userInput.email = "";
            this.userInput.password = "";
          }
        });
    },
    logout() {
      store.dispatch("headerModules/logoutHandler");
    },
  },
  mounted() {
    store.dispatch("headerModules/checkuserHandler");
  },
  watch: {
    $route() {
      this.login_popup['active'] = 0
    },
  },
};
</script>

<style scoped>
@media (min-width: 1200px) {
  .mobile_menu,
  .mb_searchbar {
    display: none;
  }
}

.mobile_menu {
  width: 100%;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 40px;
  padding: 5px 0;
  box-sizing: unset;
  background: #fff;
}
.mobile_category {
  float: left;
  text-align: center;
  width: 50px;
  font-size: 20px;
}
.mobile_search {
  float: left;
  text-align: center;
  width: 50px;
  font-size: 20px;
  cursor: pointer;
}
.mobile_cart {
  float: right;
  text-align: center;
  width: 60px;
  font-size: 20px;
}
.mobile_cart a {
  position: relative;
}
.mobile_cart a span {
  position: absolute;
  width: 20px;
  height: 20px;
  background: red;
  border-radius: 50%;
  font-size: 12px;
  line-height: 20px;
  color: #fff;
  left: 35px;
  top: 0;
}
.mobile_member {
  float: right;
  text-align: center;
  width: 50px;
  font-size: 20px;
}
.mobile_logo {
  position: absolute;
  text-align: left;
  width: calc(100% - 210px);
  font-size: 20px;
  top: 5px;
  left: 50px;
}
.mobile_logo img {
  height: 40px;
  margin-top: -5px;
}
.mobile_category a,
.mobile_search a,
.mobile_logo a,
.mobile_cart a,
.mobile_member a {
  display: block;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.5);
}
.mb_searchbar {
  background: #fff;
  width: 100%;
  position: absolute;
  z-index: 999;
  top: 52px;
  padding: 10px;
  display: none;
}
.mb_searchbar form input[type="text"] {
  background: #fbfbfb none repeat scroll 0 0;
  border: 2px solid #777;
  font-size: 12px;
  padding: 5px;
  width: calc(100% - 50px);
  vertical-align: top;
}
.mb_searchbar form input[type="submit"] {
  background: #777 none repeat scroll 0 0;
  border: medium none;
  color: #fff;
  font-family: Microsoft JhengHei, "Fredoka One", cursive;
  font-size: 16px;
  line-height: 32px;
  padding: 0;
  width: 45px;
  vertical-align: top;
}

.logoarea {
  width: 200px;
}
.logoarea a {
  display: block;
  color: #666;
  font-size: 3rem;
  font-weight: bolder;
}
.logoarea a:hover {
  text-decoration: none;
}
.logoarea img {
  max-width: 100%;
}
.header_area {
  width: 100%;
  background: #fff;
}
.header_style {
  position: relative;
  margin-bottom: 0px;
  background: #ffffff80;
}
.over_header {
  background: #88353c;
  width: 100%;
  height: 10px;
}

@media (max-width: 1200px) {
  .header-area {
    padding-top: 0px;
    width: 100%;
    background: #f2f2f2;
    display: none;
  }
  .over_header {
    display: none;
  }
}

.menuarea {
  width: 100%;
  padding-top: 1px;
  padding-bottom: 1px;
  position: relative;
  display: flex;
  align-items: stretch;
  padding: 0.5rem 0;
}
.main-menu {
  padding: 0 20px;
}

ul.nav {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  font-family: "Microsoft JhengHei";
}
ul.nav > li {
  display: inline-block;
  text-align: center;
  position: relative;
  display: flex;
  align-items: stretch;
  margin: 0 15px -2px 0;
  width: 90px;
  border-bottom: 2px solid #fff;
}
ul.nav > li > a {
  color: #2e3233;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s;
  letter-spacing: 2px;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  width: 100%;
  text-decoration: none;
}
ul.nav > li:hover {
  border-color: #88353c;
}
ul.nav > li:hover > a {
  color: #88353c;
}

ul.nav > li > ul {
  width: 100%;
  background: #fff;
  border: 1px solid #e2e2e2;
  list-style: outside none none;
  padding: 5px 0;
  position: absolute;
  top: calc(100% + 2px);
  z-index: 9999;
  transform: scaleY(0);
  transform-origin: 0 0 0;
  transition: all 0.5s ease 0s;
}
ul.nav > li > ul > li {
  border-right: medium none;
  display: block;
  float: left;
  width: 100%;
  padding: 5px;
  clear: both;
}
ul.nav > li > ul > li > a {
  color: #000;
  line-height: 140%;
  text-decoration: none;
  font-size: 1rem;
  letter-spacing: 0;
  display: block;
  border: none;
  padding: 5px 0;
}
ul.nav > li > ul > li > a:hover {
  color: #88353c;
}
ul.nav > li:hover > ul {
  transform: scaleY(1);
}

.main_search {
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.main_search input {
  padding: 5px;
  font-size: 1rem;
  max-width: calc(100% - 44px);
}
.main_search button {
  background: none;
  border: none;
  color: #777;
}

.login {
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
}
.login i {
  color: rgb(71, 66, 66);
  font-size: 1.5rem;
}
.login i:hover {
  opacity: 0.8;
}
.login .login_popup {
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: 0px 3px 6px 3px #000;
  padding: 1rem;
  display: none;
  background-color: #fff;
  z-index: 3;
}
.login .login_popup.active {
  display: block;
}
.login .login_popup .login_list {
  margin-bottom: 10px;
}
.login .login_popup .login_list input {
  background-color: #eee;
  border: none;
  padding: 5px 8px 5px 15px;
  border-radius: 15px;
  outline: none;
}
.login .login_popup .login_bottom a {
  color: inherit;
}
.login .login_popup .login_bottom a:hover {
  text-decoration: none;
  opacity: 0.8;
}

.user_top {
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
}
.user_top i {
  color: rgb(71, 66, 66);
  font-size: 1.5rem;
}
.user_top .user_popup {
  position: absolute;
  top: 100%;
  right: 0;
  box-shadow: 0px 3px 6px 3px #000;
  padding: 1rem;
  width: 300px;
  display: none;
  background-color: #fff;
  z-index: 3;
}
.user_top .user_popup.active {
  display: block;
}
.user_top .user_popup .user_top {
  display: flex;
}
.user_top .user_popup .user_top label {
  background-color: #000;
  color: #fff;
  border-radius: 100%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.user_top .user_popup .user_top .user_top_title {
  margin-left: 0.75rem;
}
.user_top .user_popup .user_top .user_top_title h1 {
  font-size: 1rem;
  margin-bottom: 0;
}
.user_top .user_popup .user_middle {
  border-bottom: 1px solid #ccc;
  padding: 0.75rem 0;
}
.user_top .user_popup .user_middle .user_list {
  font-size: 1.25rem;
  line-height: 1.5;
}
.user_top .user_popup .user_middle .user_list a {
  color: inherit;
}
.user_top .user_popup .user_middle .user_list a:hover {
  text-decoration: none;
  opacity: 0.8;
}
.user_top .user_popup .user_bottom {
  padding-top: 0.75rem;
}
.user_top .user_popup .user_bottom .user_list {
  font-size: 1.25rem;
  line-height: 1.5;
}
</style>
