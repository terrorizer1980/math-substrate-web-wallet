import {ApiPromise, WsProvider} from '@polkadot/api'
import {
  isWeb3Injected,
  web3Accounts,
  web3FromAddress
} from "@polkadot/extension-dapp"
import {options} from "@chainx-v2/api"
import Types from './types'
import websockets from './websockets'

class User {
  constructor(chain = 'polkadot') {
    let provider = new WsProvider(websockets[chain][0]);
    switch (chain) {
      case 'edgeware':
        this.api = ApiPromise.create({
          provider,
          types: Types.edgeware
        });
        break;
      case 'kulupu':
        this.api = ApiPromise.create({
          provider,
          types: Types.kulupu
        });
        break;
      case 'plasm':
        this.api = ApiPromise.create({
          provider,
          types: Types.plasm
        });
        break;
      case 'stafi':
        this.api = ApiPromise.create({
          provider,
          types: Types.stafi
        });
        break;
      case 'centrifuge':
        this.api = ApiPromise.create({
          provider,
          types: Types.centrifuge
        });
        break;
      case 'subsocial':
        this.api = ApiPromise.create({
          provider,
          types: Types.subsocial
        });
        break;
      case 'crab':
        this.api = ApiPromise.create({
          provider,
          types: Types.darwinia
        });
        break;
      case 'chainx':
        this.api = ApiPromise.create(options({provider}));
        break;
      default:
        this.api = ApiPromise.create({provider});
        break;
    }
  }

  async getApi() {
    return await this.api;
  }

  // 获取钱包账号
  async getAccounts() {
    if (isWeb3Injected) {
      return await web3Accounts().then(accounts => {
        accounts.forEach((account) => {
          account.isActive = false;
        });
        return accounts
      })
    }
  }

  // 操作方法（绑定，解绑等）
  async setSigner(account) {
    const api = await this.api
    return await web3FromAddress(account).then(injector => {
      api.setSigner(injector.signer);
      return api
    }).catch(err => {
      console.log(err);
      alert('Please refresh the page')
    })
  }

  // 获取账户余额
  async getBalance(account) {
    const api = await this.api
    return await api.derive.balances.all(account).then(res => {
      return res.availableBalance.toString()
    })
  }

  async getAllBalance(account) {
    const api = await this.api
    return await api.derive.balances.all(account).then(res => {
      return res;
    })
  }


}

export default User
