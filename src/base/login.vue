<template>
  <div class="login-container main-container">
    <img :src="'static/img/chain/'+currentChain+'_banner.jpg'" width="100%">
    <div class="info">
      <h1><span>{{$t('webwallet_your')}}</span> {{selectedChain.substr(0,9) == '127.0.0.1' ? 'Substrate' : selectedChain}} <span>{{$t('webwallet_wallet')}}</span>
      </h1>
      <p><span>{{$t('webwallet_home_des1')}}</span> {{symbol}} <span>{{$t('webwallet_home_des2')}}</span>
      </p>
      <div><a @click="login" class="btn">{{$t('webwallet_login')}}</a></div>
    </div>
  </div>
</template>
<script>

  import {
    isWeb3Injected,
  } from "@polkadot/extension-dapp"
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {
        nodeUrl: '',
        network: '',
      }
    },
    computed: {
      ...mapGetters({
        selectedChain: 'selectedChain',
      })
    },
    methods: {
      login() {
        if (isWeb3Injected) {
          this.user.getAccounts().then((accounts) => {
            if (accounts.length != 0) {
              this.$emit('selectAccount', 'select');
            }
          })
        }else{
          this.noExtension();
        }
      },
      // 没有安装插件
      noExtension() {
        this.$confirm({
          content: this.$t('noMathExtension'),
          yesText: "Download",
          noText: "Close"
        }).then(success => {
          if (success) {
            window.open(this.globalData.website);
          }
        });
      },
      // 插件被锁定
      extensionLock() {
        this.$alert({
          content: this.$t('mathExtensionLock'),
          btnText: 'Close'
        }).then(() => {
          window.location.reload();
        });
      }
    },
    watch: {
      $route(to, from) {
        console.log(this.$route.path);
      }
    }
  }
</script>
<style scoped>
  a.btn {
    width: 45%;
  }
</style>

