import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from 'static/js/i18n'
import store from './store'
import axios from 'axios'
import webUtil from 'static/js/util'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'static/css/index.css'
import clipboard from 'vue-clipboard2'
import { Alert, Confirm, Toast, Loading } from "wc-messagebox";
import "wc-messagebox/style.css";
import BigNumber from "static/js/bignumber.mjs"
import webCoin from 'static/js/coinUnit.js'

Vue.config.productionTip = false
Vue.use(clipboard)

Vue.prototype.webUtil = webUtil;
Vue.prototype.axios = axios;
Vue.prototype.webCoin = webCoin;
Vue.prototype.BigNumber = BigNumber;

// 混入方法
import { mapGetters, mapActions } from 'vuex'
Vue.mixin({
  data() {
    return {
      toastInstance: null,
      root: '/',
      apiLink:'http://localhost',
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      account: 'account',
      currentChain: 'currentChain',
      chainInfo: 'chainInfo',
    }),
    user() {
      return this.chainInfo ? this.chainInfo.ws : null
    },
    symbol() {
      return this.chainInfo ? this.chainInfo.symbol : 'KSM'
    },
    decimal() {
      return this.chainInfo ? this.chainInfo.decimals : 12
    },
    chainId() {
      return this.chainInfo ? this.chainInfo.chainId : 19
    }
  },
  methods:{
    // 复制
    copyAddress(val) {
      if (this.webUtil.browserVersions().android) {
        var oInput = document.createElement("input");
        oInput.type = "text";
        oInput.value = val;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象
        document.execCommand("Copy"); // 执行浏览器复制命令
        oInput.parentNode.removeChild(oInput); //执行完之后删除该对象
        this.$toast(this.$t("copy_success"));
      } else {
        this.$copyText(val).then(
          e => {
            //复制成功的回调
            this.$toast(this.$t("copy_success"));
          },
          e => {
            this.$toast(this.$t("copy_fail"));
          }
        );
      }
    },
    // 拉取代币价格
    getTokenPrice(nodeUrl, alias, type){
      let query = '';
      let response = {};
      let url = nodeUrl +'api/tokenListPub?type='+type+query;
     return  new Promise(resolve => {
       this.axios.get(url).then(res=>{
         response = res.data.data;
         resolve(alias.length>0 ? webUtil.findToken(response, alias) : response) ;
       })
     })
    },
    // 拉取汇率 1USD = ～RMB
    getCoinPub(nodeUrl){
      let query = '';
      let url = nodeUrl + 'api/baseCoinPub?v=1.0'+query;
      let coins = {};
      return  new Promise(resolve => {
       this.axios.get(url).then((res)=>{
         if (res.data.success){
           let response = res.data.data.legal;
           response.forEach(coin=>{
             if (coin.alias == 'CNY'){
               coins.cny = coin.rmb;
             }
             if (coin.alias == 'USD'){
               coins.usd = coin.rmb;
             }
             if (coin.alias == 'KRW'){
               coins.krw = coin.rmb;
             }
           });
         }
         resolve(coins);
       })
     })
    }
  }
})

/* eslint-disable no-new */
var vue1 = new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
});

Vue.use(Alert, {
  title: vue1.$t('prompt'),
  btnText: 'OK'
});
Vue.use(Confirm, {
  title: vue1.$t('Confirm'),
});
Vue.use(Toast, {
  location: 'bottom',
  toastStyle: {
    height: '60px',
    width: '160px',
    fontSize: '16px'
  },
});
