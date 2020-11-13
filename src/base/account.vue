<template>
<div class="main-container">
  <img :src="'static/img/chain/'+currentChain+'_banner.jpg'" width="100%">
  <div class="account-list">
    <h4>Select Account</h4>
    <ul>
      <li v-for="account in accounts"><a href="#" v-bind:class="{active:account.isActive}" @click="selectAction(account)">{{account.address}}</a></li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      accounts:[]
    }
  },
  created() {
  },
  mounted(){
    this.getAccounts();
  },
  methods:{
    getAccounts(){
      this.user.getAccounts().then((accounts)=>{
        this.accounts = accounts;
      });
    },
    selectAction(account){
      this.accounts.forEach(acc=>{
        if (acc.address == account.address){
          acc.isActive = true;
        } else{
          acc.isActive = false;
        }
      });
      this.webUtil.setSession("identity_"+this.currentChain, account.address);
      this.$emit('sendAccount',account.address);
      window.location.reload();
    }
  },
  watch: {
    $route(to, from) {
      // console.log(this.$route.path);
    }
  }
}
</script>
<style>
  .account-list{
    padding: 32px 24px;
  }
  .account-list h4{
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: #8a8a8f;
  }
  .account-list ul{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .account-list li{
    margin-top: 16px;
    width: 49%;
    border-radius:8px;
    background: #efeff4;
    padding: 16px;
  }

  .account-list li a{
    background: url("../../static/img/icons/checkbox_off@2x.png") no-repeat right center/20px;
    color: #000;
    font-size: 14px;
    line-height: 20px;
    display: block;
    word-break: break-all;
    padding-right: 26px;
  }
  .account-list li a.active{
    background: url("../../static/img/icons/choose_only_big@2x.png") no-repeat right center/20px;

  }
</style>
