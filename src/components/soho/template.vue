<template>
    <section class="soho">
            <div class="container">
                <div class="row">
                    <div v-for="soho in sohos_list" class="col-md-3 col-sm-12">
                        <div class="soho_item">
                            <div class="soho_top">
                                <label :style="soho.color">{{soho.name_index}}</label>
                                <div class="soho_top_title">
                                    <h1>{{soho.name}}</h1>
                                    <span>{{soho.company}}<template
                                            v-if="soho.user_company=='1'">．{{soho.companyid}}</template>．{{soho.country}}</span>
                                </div>
                            </div>
                            <div class="soho_middle" :style="soho.sohocolor">
                                <div class="soho_middle_text">{{soho.soho_desc}}</div>
                            </div>
                            <div class="soho_bottom">
                                <h1><router-link class="page-link" :to="{name:'sohoInfo',params:{id:soho.soho_id}}">{{soho.soho_name}}</router-link></h1>
                                <div class="soho_tag">
                                    <a v-for="tag in soho.tags">{{tag}}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pager">
                    <ul class="pagination">
                        <li class="page-item" v-for="p in pager">
                            <router-link class="page-link" :to="{name:'soho',query:{p:p}}">{{p}}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
</template>

<script>
export default {
  name: 'sohoBlock',
  computed: {
        sohos_list() {
            return this.$store.getters['sohoModules/sohoslist']
        },
        pager() {
            return this.$store.getters['sohoModules/sohospage']
        }
    },
    mounted() {
        store.dispatch('sohoModules/sohoHandler')

        let page = this.$route.query.p ? parseInt(this.$route.query.p) : 1
        store.dispatch('sohoModules/pageHandler', page)
    },
    watch: {
        $route(now) {
            let page = this.$route.query.p
            store.dispatch('sohoModules/pageHandler', page)
        }
    }
}
</script>