<template>
  <div>
    <section class="user-info text-center">
      <div class="avator">
        <img :src="'static/img/chain/'+currentChain+'_icon@2x.png'" width="100%"/>
      </div>
      <h4>{{webUtil.stringToCapitalize(currentChain)}} Wallet</h4>
      <p id="copyContent">{{account}}</p>
      <div class="operation-list" v-bind:class="{shard_select:shard_selected}">
        <!-- 复制地址 -->
        <a class="grey-fsz" @click="copyAddress(account)">{{$t("webwallet_copy_address")}}</a>
        <!-- <a class="grey-fsz" id="copyBtn" data-clipboard-target="#copyContent" data-clipboard-action="copy">{{$t("webwallet_copy_address")}}</a> -->
      </div>
      <div class="token-info">
        <!-- 总计 -->
        <p v-if="currentChain == 'polkadot'">{{$t("webwallet_total")}} <span
          :class="{'italic-font':decimal==10}">{{decimal==10?'NEW':''}} {{symbol}}</span></p>
        <p v-else>{{$t("webwallet_total")}} {{symbol}}</p>
        <h4>{{webUtil.addCommas(balances.sum,6)}}</h4>
        <p
          class="grey-fsz"
        >&asymp; {{webUtil.addCommas(balances[unit] ? balances[unit] : '0.00')}} {{unit}}</p>
        <ul class="token-list">
          <li v-for="(item,index) in balances.list" :key="index">
            <div v-if="index == 'GGT'">GGT</div>
            <div v-else>{{$t(index)}} {{symbol}}</div>
            <div>{{item?webUtil.addCommas(item,4):0}}</div>
          </li>
        </ul>
      </div>
    </section>
    <div class="refresh-logout">
      <!-- 刷新 -->
      <a class="grey-fsz refresh" @click="refresh">{{$t('webwallet_refresh')}}</a>
      <!-- 退出 -->
      <a class="grey-fsz logout" @click="logout">{{$t('webwallet_logout')}}</a>
    </div>
  </div>
</template>
<style scoped>
  .shard label {
    margin-right: 8px;
  }

  .shard select {
    padding: 0 8px 0 22px;
    width: 60px;
    border-radius: 0;
    background: url("../../static/img/icons/dropdown_black@2x.png") no-repeat 44px center/12px;
  }
</style>
<script>
  import common from "../../static/js/common.js";

  export default {
    props: ["balances",],
    data() {
      return {
        unit: this.webCoin.unit,
        shardID: 0,
        shard_selected: false,
        time: "",
        value: {
          CNY: 0,
          USD: 0,
          KRW: 0
        },
      };
    },
    created() {
    },
    mounted() {
      this.getUnit();
    },
    methods: {
      refresh() {
        window.location.reload();
      },
      refreshBalance() {
        this.$emit("balanceUpdate");
      },
      logout() {
        this.webUtil.sessionClear();
        window.location.reload();
      },
      getUnit() {
        // 用$on事件来接收参数
        common.$on("val", data => {
          this.unit = data;
        });
      }
    }
  }
  ;
</script>
