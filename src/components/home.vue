<template>
  <div :class="{webwallet:account}">
    <web-nav
      @setCurrentNode="setCurrentNode"
    ></web-nav>
    <account v-show="account_select" @sendAccount="getAccount"></account>
    <login
      v-if="!account && account_select==false"
      @sendAccount="getAccount"
      v-on:selectAccount="selectAccount"
    ></login>
    <template v-else-if="account && account_select==false">
      <side-bar :balances="balances" :account="account"></side-bar>
      <section class="main-info">
        <div class="main-container transfer-container" v-if="!detail">
          <div class="tabs">
            <!-- 转账tab -->
            <a class="tab" @click="toggleTabs(1)">{{$t("transfer")}}</a>
            <a class="tab" @click="toggleTabs(2)" v-if="currentChain != 'subsocial' && currentChain != 'chainx'">{{$t("webwallet_transactions")}}</a>
          </div>
          <!-- 转账内容 -->
          <div class="transfer" v-show="selectedTab==1">
            <form class="basic-form">
              <!-- 接收地址 -->
              <label>{{$t("webwallet_to_address")}}</label>
              <input
                type="text"
                :placeholder="$t('webwallet_to_address_pl')"
                v-model="transfer.account"
              />
              <ul class="basic-group clearfix">
                <li class="amount">
                  <!-- 转账金额 -->
                  <label>{{$t("transfer_amount")}}</label>
                  <input type="text" placeholder="0" v-model="transfer.amount"/>
                </li>
                <li class="token">
                  <!-- Token -->
                  <label>Token</label>
                  <select v-model="symbol">
                    <option v-for="item in values" :value="item" :key="item">{{item}}</option>
                  </select>
                </li>
              </ul>
              <!-- 备注 -->
              <label>
                <i>{{$t("webwallet_fee")}}</i>
                {{fee ? fee:'-m '+symbol }}
              </label>
              <a class="btn" v-if="!transferring" @click="sendTransfer">{{$t("transfer")}}</a>
              <button class="btn" v-else disabled="disabled">{{$t('transferring')}}</button>
            </form>
          </div>
          <!-- 交易记录内容 -->
          <div class="transactions" v-show="selectedTab==2">
            <div v-if="transactions.txs.length != 0">
              <table>
                <thead>
                <tr>
                  <th>{{$t("webwallet_txHash")}}</th>
                  <th>{{$t('webwallet_value')}}</th>
                  <th>{{$t('from')}}</th>
                  <th>{{$t("webwallet_status")}}</th>
                  <th>{{$t("webwallet_tx_time")}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in transactions.txs" :key="item.id" @click="txDetail(item)">
                  <td>
                    <a>{{item.hash}}</a>
                  </td>
                  <td>
                    <a>{{item.amount}} {{transfer.token}}</a>
                  </td>
                  <td>
                    <a>{{item.from}}</a>
                  </td>
                  <td>
                    <a>{{item.status}}</a>
                  </td>
                  <td>
                    <a>{{item.time}}</a>
                  </td>
                </tr>
                </tbody>
              </table>
              <div class="page-pagination">
                <template v-if="currentPage==1">
                  <img src="static/img/icons/first_disabled@2x.png" width="16"/>
                  <img src="static/img/icons/previous_disabled.png" width="16"/>
                </template>
                <template v-else>
                  <!-- first btn -->
                  <img
                    src="static/img/icons/first@2x.png"
                    width="16"
                    class="clickable"
                    @click="getTransactions(1)"
                  />
                  <!-- previous btn -->
                  <img
                    src="static/img/icons/previous.png"
                    width="16"
                    class="clickable"
                    @click="getTransactions('previous')"
                  />
                </template>
                <span class="pageOf">
                  {{currentPage}} /
                  <i>{{Math.ceil(transactions.total/pageSize)}}</i>
                </span>
                <template v-if="currentPage==Math.ceil(transactions.total/pageSize)">
                  <img src="static/img/icons/next_disabled@2x.png" width="16"/>
                  <img src="static/img/icons/last_disabled@2x.png" width="16"/>
                </template>
                <template v-else>
                  <!-- next btn -->
                  <img
                    src="static/img/icons/next@2x.png"
                    width="16"
                    class="clickable"
                    @click="getTransactions('next')"
                  />
                  <!-- last btn -->
                  <img
                    src="static/img/icons/last@2x.png"
                    width="16"
                    class="clickable"
                    @click="getTransactions(Math.ceil(transactions.total/pageSize))"
                  />
                </template>
              </div>
            </div>
            <div v-else class="null">
              <p>{{$t('noTransaction')}}</p>
            </div>
          </div>
        </div>
        <!-- 交易记录详情-->
        <div class="main-container transfer-container" v-else-if="detail">
          <a class="back-transactions" @click="backTransactions">{{$t("back_transactions")}}</a>
          <h5>{{$t("transaction_information")}}</h5>
          <!-- 交易记录详情 -->
          <div class="trans_detail text-center">
            <p>{{webUtil.stringToCapitalize(transaction.type)}}</p>
            <h4>{{transaction.amount?webUtil.addCommas(transaction.amount,6):'--'}} {{symbol}}</h4>
            <p class="grey-fsz">≈ {{money[unit]}} {{unit}}</p>
            <ul class="text-left">
              <li>
                <span>{{$t("webwallet_status")}}</span>
                <p>{{transaction.status}}</p>
              </li>
              <li>
                <span>{{$t("from")}}</span>
                <p>{{transaction.from}}</p>
              </li>
              <li>
                <span>{{$t("to")}}</span>
                <p>{{transaction.to}}</p>
              </li>
              <li>
                <span>{{$t("webwallet_fee")}}</span>
                <p>{{transaction.fee}} {{symbol}}</p>
              </li>
              <li class="txHash">
                <span>{{$t("webwallet_txHash")}}</span>
                <p>{{transaction.hash}}</p>
              </li>
              <li>
                <span>{{$t("webwallet_block_height")}}</span>
                <p>{{transaction.block_num}}</p>
              </li>
              <li>
                <span>{{$t("webwallet_tx_time")}}</span>
                <p>{{transaction.time}}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
<script>
  import webNav from "base/nav";
  import login from "base/login";
  import sideBar from "base/sidebar";
  import account from "base/account";
  import common from "static/js/common";
  import {mapGetters, mapActions} from 'vuex'
  import {ApiPromise, WsProvider} from "@polkadot/api";
  export default {
    data() {
      return {
        account_select: false,
        unit: this.webCoin.unit,
        transfer: {
          account: "",
          amount: 0,
          token: this.symbol,
          // fee: "0.01"
        },
        values: [],
        coin: {
          cny: 0,
          usd: 0,
          krw: 0
        },
        tokenPrice: {
          rmb: 0,
          usd: 0,
          krw: 0
        },
        balances: {
          sum: 0,
          USD: 0,
          CNY: 0,
          KRW: 0,
          list: {
            available: 0,
            locked: 0
          }
        },
        selectedTab: 1,
        // 交易记录
        detail: false,
        currentPage: 1,
        transactions: {
          total: 0,
          txs: []
        },
        transaction: {}, // 详情页交易记录
        pageSize: 15,
        money: {
          CNY: 0,
          USD: 0,
          KRW: 0
        },
        transferring: false,
        priceCny: 0,
        transferFee: [],
      };
    },
    created() {
      // 刷新页面后获取当前节点
      if (!this.webUtil.getSession(this.currentChain)) {
        this.webUtil.setSession('currentNode', this.currentChain);
      }

      if (this.account){
        this.initExtension();
        this.dropdownToken();
      }
    },
    mounted() {
      this.getUnit();
    },
    computed: {
      ...mapGetters({
        account: "account" //账户模式
      }),
      fee() {
        if (this.transfer.amount && this.transfer.account && this.transfer.amount - 0 > 0) {
          this.getTransferFee(this.transfer.account, this.transfer.amount).then(res => {
            this.$set(this.transferFee, 0, res);
          });
          return this.transferFee[0];
        } else {
          return '-m ' + this.symbol;
        }
      }
    },
    methods: {
      ...mapActions(["setAccount"]),
      getAccount() {
        if (this.webUtil.getSession("identity_" + this.currentChain)) {
          this.setAccount(JSON.parse(this.webUtil.getSession("identity_" + this.currentChain)));
        }
      },
      selectAccount(param) {
        if (param) {
          this.account_select = true;
        }
      },
      getUnit() {
        // 用$on事件来接收参数
        common.$on("val", data => {
          this.unit = data;
        });
      },
      // 选择节点
      setCurrentNode(node) {
        if (node) {
          this.$router.push('../' + this.currentChain);
        }
      },
      toggleTabs(tab) {
        this.selectedTab = tab;
      },
      decimalDeal(str) {
        let tmp = new this.BigNumber(str);
        let num = tmp.div(Math.pow(10, this.decimal)).toFixed();
        return num == 0 ? 0 : num;
      },
      async initAction() {
        const provider = new WsProvider(this.currentChain);
        return await ApiPromise.create({provider});
      },
      // 获取代币
      dropdownToken() {
        this.values.push(this.symbol);
      },
      getTransactions(num) {
        let page = this.currentPage;
        switch (num) {
          case "previous":
            page--;
            break;
          case "next":
            page++;
            break;
          default:
            page = num;
        }
        this.getTransfers(page);
      },
      // 获取交易记录
      getTransfers(page) {
        let url = 'https://'+this.currentChain+'.subscan.io/api/scan/transfers';
        let params = {
          row: this.pageSize,
          page: page - 1,
          address: this.account
        };
        this.axios.post(url, params).then((res) => {
          if (!res.data.code && res.data.data) {
            let result = res.data.data;
            if (result.count > 0) {
              this.transactions.total = result.count;
              this.transactions.txs = result.transfers;
              this.transactions.txs.forEach((tx) => {
                tx.time = this.webUtil.timestampToDate(tx.block_timestamp * 1000);
                tx.status = tx.success ? 'Success' : 'Fail';
                tx.fee = new this.BigNumber(tx.fee).div(Math.pow(10, this.decimal)).toFixed();
                tx.type = tx.module == 'balances' ? 'Transfer' : '--';
              });
              this.currentPage = page;
            }
          }
        })
      },
      txDetail(tx) {
        this.detail = true;
        this.transaction = tx;
        this.money.CNY = new this.BigNumber(tx.amount).times(this.priceCny).toFixed(6);
        this.money.USD = new this.BigNumber(this.money.CNY).div(this.coin.usd).toFixed(6);
        this.money.KRW = new this.BigNumber(tx.amount).div(this.coin.krw).toFixed(6);
      },
      backTransactions() {
        this.detail = false;
      },
      async initExtension() {
        let balance = await this.user.getAllBalance(this.account);
        this.balances.sum = this.decimalDeal(balance.freeBalance.toString());
        this.balances.list.available = this.decimalDeal(
          balance.availableBalance.toString()
        );
        this.balances.list.locked = this.decimalDeal(
          balance.lockedBalance.toString()
        );

        this.coin = await this.getCoinPub('https://market.maiziqianbao.net/');
        this.getTokenPrice('https://market.maiziqianbao.net/', [this.symbol], this.chainId).then(res => {
          if (res && res[this.symbol]) {
            this.priceCny = res[this.symbol];
            let price = new this.BigNumber(res[this.symbol] + '');
            this.balances.CNY = price.times(this.balances.sum).toString();
            this.balances.USD = price.div(this.coin.usd).times(this.balances.sum).toString();
            this.balances.KRW = price.div(this.coin.krw).times(this.balances.sum).toString();
          }
        });
        if (this.currentChain != 'subsocial' && this.currentChain != 'chainx'){
          this.currentPage = 1;
          // 首次拉取交易记录条数
          // 首次获取交易记录
          this.getTransfers(this.currentPage);
        }
      },
      sendTransfer() {
        if (!this.transfer.account) {
          this.$alert(this.$t("transfer_account_null"));
          return false;
        }

        if (!this.transfer.amount) {
          this.$alert(this.$t("transfer_amount_null"));
          return false;
        }
        if (this.transfer.amount < Math.pow(10, -this.decimal)) {
          this.$alert(
            this.$t("transfer_amount_min") + Math.pow(10, -this.decimal)
          );
          return false;
        }

        this.transferring = true;
        let address = this.webUtil.trimString(this.transfer.account);
        let amount = new this.BigNumber(this.transfer.amount);
        amount = amount.times(Math.pow(10, this.decimal)).toFixed();
        this.user.setSigner(this.account).then((api) => {
          api.tx.balances
            .transfer(address, amount)
            .signAndSend(this.account, status => {
              console.log(status);
              if (status.isCompleted && status.isInBlock && !status.isError) {
                if (status.findRecord("system", "ExtrinsicSuccess")) {
                  this.$alert(this.$t("transfer_success")).then(() => {
                    this.transferring = false;
                    window.location.reload();
                  });
                } else {
                  this.$alert(this.$t("transfer_fail"));
                  this.transferring = false;
                }
              }
            })
            .catch(err => {
              console.log(err);
              this.$alert(this.$t("transfer_fail"));
              this.transferring = false;
            });
        })
      },
      getTransferFee(to, amount) {
        return this.user.getApi().then(async (api)=>{
          let amountFormat = new this.BigNumber(amount).times(Math.pow(10, this.decimal)).toFixed();
          let transfer = await api.tx.balances.transfer(to, amountFormat);
          let payment = await transfer.paymentInfo(this.account);
          return payment.partialFee.toHuman();
        })
      }
    }
    ,
    components: {
      account,
      sideBar,
      login,
      webNav
    }
  }
  ;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .back-transactions {
    font-size: 12px;
    line-height: 16px;
    float: right;
    color: var(--blueColor) !important;
    margin-top: 4px;
  }
</style>
