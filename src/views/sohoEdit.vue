<template>
  <section class="soho_edit">
    <div class="container">
      <div class="block">
        <div class="list">
          <span>服務項目：</span
          ><input type="text" v-model="add.name" placeholder="服務項目" />
        </div>
        <div class="list">
          <span>所在地：</span>
          <div class="country_block">
            <span>
              <input
                type="radio"
                name="country"
                v-model="checkAll"
                :value="true"
                :id="'country_00'"
                @click="checkA"
              /><label :for="'country_00'">無限制</label>
            </span>
            <span v-for="(c, index) in country_list" :key="index">
              <input
                type="checkbox"
                name="country"
                v-model="add.local"
                :value="index"
                :id="'country_' + index"
              /><label :for="'country_' + index">{{ c }}</label>
            </span>
          </div>
        </div>
        <div class="list">
          <span>報價：</span>
          <input type="text" v-model="add.price" placeholder="報價金額" />
          <select v-model="add.unit">
            <option :value="0">報價單位・有報價則必選</option>
            <option :value="1">次</option>
            <option :value="2">件</option>
            <option :value="3">月</option>
            <option :value="4">天</option>
            <option :value="5">小時</option>
          </select>
        </div>
        <div class="list">
          <span>服務描述：</span>
          <textarea
            v-model="add.desc"
            placeholder="為確保隱私安全以及讓其他用戶方便聯繫，聯繫方式請勿直接在內容中曝光， 若內容包含聯繫方式， 系統將直接移除。"
          ></textarea>
        </div>
        <div class="list">
          <span>標籤：</span>
          <div>
            <div class="tags_list">
              <template v-for="(t, index) in add.tags"
                ><label :key="index"
                  >{{ t }}
                  <i
                    class="fas fa-times-circle"
                    @click="deleteTag(index)"
                  ></i></label
              ></template>
            </div>
            <input
              type="text"
              v-model="tag"
              @keyup.enter="tagEnter"
              placeholder="輸入後請按 ↩︎ 送出・最多10個"
            />
          </div>
        </div>
        <div class="list">
          <span>其他：</span>
          <input
            type="checkbox"
            id="more_0"
            v-model="add.more"
            value="invoice"
          /><label for="more_0">可開發票</label>
          <input
            type="checkbox"
            id="more_1"
            v-model="add.more"
            value="long_term"
          /><label for="more_1">可長期配合</label>
        </div>
        <div class="list">
          <span>作品：</span>
          <div>
            <button @click="addWork">添加作品連結</button>
            <div class="add_list" v-for="(w, index) in add.work" :key="index">
              <span @click="deleteWork(index)"></span>
              <input type="text" v-model="w.name" placeholder="描述" />
              <input
                type="text"
                v-model="w.link"
                placeholder="連結，包含http/https"
              />
            </div>
          </div>
        </div>
        <div class="list">
          <span>相關證照／證書：</span>
          <div>
            <button @click="addCert">添加相關證照／證書</button>
            <div class="add_list" v-for="(c, index) in add.cert" :key="index">
              <span @click="deleteCert(index)"></span>
              <input type="text" v-model="c.name" placeholder="證照/證書" />
              <input type="text" v-model="c.notes" placeholder="附註・選填" />
            </div>
          </div>
        </div>
        <div class="list">
          <span>得獎項目：</span>
          <div>
            <button @click="addAward">添加得獎項目</button>
            <div class="add_list" v-for="(a, index) in add.award" :key="index">
              <span @click="deleteAward(index)"></span>
              <input type="text" v-model="a.name" placeholder="獎項" />
              <input type="text" v-model="a.year" placeholder="年份" />
            </div>
          </div>
        </div>
        <div class="list">
          <input type="button" value="新增" @click="send" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "@/store/index.js";

export default {
  name: "sohoEditBlock",
  data() {
    return {
      add: {
        name: "",
        price: "",
        unit: 0,
        desc: ``,
        tags: [],
        local: [],
        more: [],
        work: [],
        cert: [],
        award: [],
      },
      tag: "",
    };
  },
  computed: {
    country_list() {
      return this.$store.state.country;
    },
    user() {
      return this.$store.state.headerModules.user;
    },
    checkAll: {
      get() {
        return this.add.local.length >= this.country_list.length;
      },
      set() {
        // return this.add.local.length >= this.country_list.length
      },
    },
  },
  mounted() {},
  methods: {
    checkA() {
      if (this.add.local.length < this.country_list.length) {
        this.add.local = [];
        for (let i = 0; i < this.country_list.length; i++) {
          this.add.local.push(i);
        }
      } else {
        this.add.local = [];
      }
    },
    tagEnter() {
      this.add.tags.push(this.tag);
      this.tag = "";
    },
    addWork() {
      this.add.work.push({ name: "", link: "" });
    },
    deleteWork(d) {
      this.add.work.splice(d, 1);
    },
    addCert() {
      this.add.cert.push({ name: "", notes: "" });
    },
    deleteCert(d) {
      this.add.cert.splice(d, 1);
    },
    addAward() {
      this.add.award.push({ name: "", year: "" });
    },
    deleteAward(d) {
      this.add.award.splice(d, 1);
    },
    deleteTag(d) {
      this.add.tags.splice(d, 1);
    },
    send() {
      if (
        this.add.name == "" ||
        this.add.local.length == 0 ||
        this.add.desc == ""
      ) {
        alert("請輸入基本資料!");
        return false;
      }
      if (this.add.price !== "" && this.add.unit == 0) {
        alert("請填寫報價單位");
      }
      this.add.user_id = this.user.user_id;
      console.log(this.add);
      store.dispatch("sohoEditModules/sohoAdd", this.add);
    },
  },
};
</script>

<style scoped>
.soho_edit {
}
.soho_edit .block {
  max-width: 800px;
  margin: 0 auto;
}
.soho_edit .block .list {
  margin-bottom: 0.75rem;
  display: flex;
  align-items: top;
}
.soho_edit .block .list > span {
  min-width: 150px;
  text-align: right;
  padding-right: 1rem;
  font-weight: 300;
}
.soho_edit .block .list input[type="radio"],
.soho_edit .block .list input[type="checkbox"] {
  display: none;
}
.soho_edit .block .list input[type="text"] {
  padding: 2px 5px;
  margin-right: 5px;
}
.soho_edit .block .list textarea {
  width: 100%;
  min-height: 300px;
  padding: 5px;
}
.soho_edit .block .list select {
  min-width: 150px;
  margin-right: 5px;
  padding: 2px 5px;
}
.soho_edit .block .list > label {
  border: 1px solid #aaa;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.soho_edit .block .list > label:hover {
  opacity: 0.8;
}
.soho_edit .block .list .country_block > span > label {
  border: 1px solid #aaa;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
}
.soho_edit .block .list .country_block > span > label:hover {
  opacity: 0.8;
}
.soho_edit .block .list .tags_list > label {
  border: 1px solid #aaa;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
}
.soho_edit .block .list .tags_list > label i {
  color: #777;
  margin-left: 0.75rem;
  cursor: pointer;
}
.soho_edit .block .list .tags_list > label i:hover {
  opacity: 0.8;
}
.soho_edit .block .list input:checked + label {
  background-color: #0177b5;
  color: #fff;
  border-color: #0177b5;
}
.soho_edit .block .list button {
  border: 1px solid #aaa;
  background-color: #fff;
  border-radius: 5px;
}
.soho_edit .block .list .add_list {
  margin-top: 10px;
}
.soho_edit .block .list .add_list span:after {
  content: "\f056";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #f94b4b;
  cursor: pointer;
  font-size: 1.25rem;
}
</style>
