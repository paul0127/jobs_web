<template>
    <section class="regist">
        <div class="container">
            <div class="regist_block">
                <div class="regist_list">
                    <span>信箱：</span><input type="text" v-model="regist.email" placeholder="請輸入信箱地址">
                </div>
                <div class="regist_list">
                    <span>密碼：</span><input type="password" v-model="regist.password" placeholder="請輸入設定密碼">
                </div>
                <div class="regist_list">
                    <span>再次輸入密碼：</span><input type="password" v-model="regist.repassword" placeholder="請再次輸入密碼">
                </div>
                <div class="regist_list">
                    <span>用戶身分：</span>
                    <input type="radio" name="corp" v-model="regist.corp" :value="0" id="corp_0"><label for="corp_0">個人身分</label> 
                    <input type="radio" name="corp" v-model="regist.corp" :value="1" id="corp_1"><label for="corp_1">團隊身分</label>
                </div>
                <div class="regist_list" v-if="regist.corp==0">
                    <span>顯示名稱：</span><input type="text" v-model="regist.nick" placeholder="請輸入顯示名稱">
                </div>
                <div class="regist_list" v-if="regist.corp==1">
                    <span>公司名稱：</span><input type="text" v-model="regist.name" placeholder="請輸入公司名稱">
                </div>
                <div class="regist_list" v-if="regist.corp==1">
                    <span>公司統編：</span><input type="text" v-model="regist.campanyID" placeholder="請輸入公司統編 (可不填)">
                </div>
                <div class="regist_list">
                    <span>性別：</span>
                    <input type="radio" name="sex" v-model="regist.sex" :value="0" id="sex0"><label for="sex0">男</label> 
                    <input type="radio" name="sex" v-model="regist.sex" :value="1" id="sex1"><label for="sex1">女</label>
                </div>
                <div class="regist_list">
                    <span>出生日期：</span>
                    <select name="year" v-model="year">
                        <option v-for="y in getyear" :value="y">{{y}}</option>
                    </select>
                    <select name="month" v-model="month">
                        <option v-for="m in getmonth" :value="m">{{m}}</option>
                    </select>
                    <select name="day" v-model="day">
                        <option v-for="d in getday" :value="d">{{d}}</option>
                    </select>
                </div>
                <div class="regist_list">
                    <span>所在地：</span>
                    <div class="country_block">
                        <template v-for="(c,index) in country_list">
                            <input type="radio" name="country" v-model="regist.local" :value="index" :id="'country_'+index"><label :for="'country_'+index">{{c}}</label> 
                        </template>
                    </div>
                </div>
                <div class="regist_list">
                    <input type="button" value="註冊" @click="send">
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
  name: 'registBlock',
  data() {
        return {
            year: 0,
            month: 1,
            day: 1,
            regist: {
                email: '',
                password: '',
                repassword: '',
                corp: 0,
                name: '',
                campanyID: '',
                nick: '',
                sex: 0,
                birthday: '',
                local: 0
            }
        }
    },
    computed: {
        country_list() {
            return this.$store.state.country
        },
        getyear() {
            let date = new Date()
            let nowyear = date.getFullYear()
            let year = []
            for (let i = nowyear; i > (nowyear - 100); i--) {
                year.push(i)
            }
            return year
        },
        getmonth() {
            let month = []
            for (let i = 1; i < 13; i++) {
                month.push(i)
            }
            return month
        },
        getday() {
            let day = []
            if (this.month == 1 || this.month == 3 || this.month == 5 || this.month == 7 || this.month == 8 || this.month == 10 || this.month == 12) {
                days = 31;
            } else if (this.month == 4 || this.month == 6 || this.month == 9 || this.month == 11) {
                days = 30;
            } else {
                if ((this.year % 4 == 0 && this.year % 100 != 0) || (this.year % 400 == 0)) {
                    days = 29;
                } else {
                    days = 28;
                }
            }

            for (let i = 1; i < days + 1; i++) {
                day.push(i)
            }

            return day
        }
    },
    mounted() {
        let date = new Date()
        let nowyear = date.getFullYear()
        this.year = nowyear
    },
    methods: {
        send() {
            if (this.regist.email == '' || this.regist.password == '') {
                alert('請輸入基本資料!')
                return false
            }
            if ((this.corp == 0 && this.regist.nick == '') || (this.corp == 1 && this.regist.name == '')) {
                alert('請輸入基本資料!')
                return false
            }
            if (this.regist.password !== this.regist.repassword) {
                alert('兩次密碼輸入不同!')
                return false
            }
            this.regist.birthday = this.year + '-' + this.month + '-' + this.day

            store.dispatch('registModules/registHandler', this.regist)
        }
    }
}
</script>
