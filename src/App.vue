<template>
  <div id="app">
    <!--<web-nav></web-nav>-->
    <router-view />
    <footer class="copyright">© 2020 Math Global Co., Ltd. All rights reserved.</footer>
  </div>
</template>

<script>
import { web3Enable } from "@polkadot/extension-dapp";
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    let chain = window.location.hash?(window.location.hash.toLowerCase().match(/\w+/g)?window.location.hash.toLowerCase().match(/\w+/)[0]:'polkadot'):'polkadot';
    web3Enable("mathwallet");
    this.init(chain);
  },
  computed: {
    ...mapGetters({
      chainList: "chainList",
      selectedChain: "selectedChain"
    })
  },
  methods: {
    ...mapActions(["setChain", "setUser", "setSelectedChain"]),
    init(chain) {
      if (!this.chainList[chain]) {
        chain = "polkadot";
        this.$router.push(this.root);
      }

      if (!this.selectedChain){
        this.setSelectedChain(chain);
      }

      // 连接ws
      if (!this.chainList[chain].ws) {
        this.setUser(chain);
      }

      // 切换节点
      if (this.currentChain != chain) {
        this.setChain(chain);
      }
    }
  },
  watch: {
    $route(to, from) {
      // 路由不是 /
      if (from.name) {
        let toChain = to.path.toLowerCase().match(/\w+/g)
          ? to.path.toLowerCase().match(/\w+/g)[0]
          : "polkadot";
        let fromChain = from.path.toLowerCase().match(/\w+/g)
          ? from.path.toLowerCase().match(/\w+/g)[0]
          : "polkadot";

        this.init(toChain);
        // 刷新页面
        if (fromChain != toChain) {
          sessionStorage.clear();
          window.location.reload();
        }
      }
    }
  },
};
</script>

<style>
</style>
