<template>
  <section class="sohoInfo">
    <div class="container">
      <div class="block">
        <div class="list"><span>服務項目：</span>{{ soho.soho_name }}</div>
        <div class="list">
          <span>所在地：</span>
          <div class="country_block">
            <template v-for="(c,index) in soho.country" >
              <label :key="index">{{ c }}</label>
            </template>
          </div>
        </div>
        <div class="list">
          <span>報價：</span>
          {{ soho.soho_price }} / {{ soho.soho_unit }}
        </div>
        <div class="list">
          <span>服務描述：</span>
          <div>
            {{ soho.soho_desc }}
          </div>
        </div>
        <div class="list">
          <span>標籤：</span>
          <div>
            <div class="tags_list">
              <template v-for="(t, index) in soho.soho_tags"
                ><label :key="index">{{ t }} <i class="fas fa-times-circle"></i></label
              ></template>
            </div>
          </div>
        </div>
        <div class="list">
          <span>其他：</span>
          <input
            type="checkbox"
            id="more_0"
            v-model="soho.more"
            value="invoice"
          /><label for="more_0">可開發票</label>
          <input
            type="checkbox"
            id="more_1"
            v-model="soho.more"
            value="long_term"
          /><label for="more_1">可長期配合</label>
        </div>
        <div class="list">
          <span>作品：</span>
          <div>
            <div class="add_list" v-for="(w, index) in soho.work" :key="index">
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
            <div class="add_list" v-for="(c, index) in soho.cert" :key="index">
              <span @click="deleteCert(index)"></span>
              <input type="text" v-model="c.name" placeholder="證照/證書" />
              <input type="text" v-model="c.notes" placeholder="附註・選填" />
            </div>
          </div>
        </div>
        <div class="list">
          <span>得獎項目：</span>
          <div>
            <div class="add_list" v-for="(a, index) in soho.award" :key="index">
              <span @click="deleteAward(index)"></span>
              <input type="text" v-model="a.name" placeholder="獎項" />
              <input type="text" v-model="a.year" placeholder="年份" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import store from "@/store/index.js";
export default {
  name: "sohoInfoBlock",
  computed: {
        soho(){
            return this.$store.getters['sohoInfoModules/sohoInfo']
        },
        country_list() {
            return this.$store.state.country
        }
    },
    mounted() {
        let id = this.$route.params.id
        store.dispatch('sohoInfoModules/sohoHandler',id)
    },
    watch: {

    }
};
</script>
