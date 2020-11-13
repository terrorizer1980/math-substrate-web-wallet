import Vue from 'vue'
import Vuex from 'vuex'
import User from '../../static/js/user'
Vue.use(Vuex)

const state = { //要设置的全局访问的state对象，初始属性值
  isLoading: true,
  account: sessionStorage.getItem('account'), //当前账户地址
  chainNameList:{
    polkadot: 'Polkadot',
    kusama: 'Kusama',
    crab: 'Darwinia Crab',
    edgeware: 'Edgeware',
    centrifuge :'Centrifuge',
    plasm: 'Plasm',
    kulupu: 'Kulupu',
    stafi: 'Stafi',
    subsocial: 'Subsocial',
    chainx: 'ChainX 2.0',
    substrate: '127.0.0.1:9944'
  },
  selectedChain: '',
  chainList: {
    'edgeware': {
      symbol: 'EDG',
      decimals: 18,
      chainId: 19003,
      ws: null,
    },
    'kusama': {
      symbol: 'KSM',
      decimals: 12,
      chainId: 19001,
      ws: null,
    },
    'polkadot': {
      symbol: 'DOT',
      decimals: 10,
      chainId: 19,
      ws: null,
    },
    'kulupu': {
      symbol: 'KLP',
      decimals: 12,
      chainId: 19007,
      ws: null,
    },
    'plasm': {
      symbol: 'PLM',
      decimals: 15,
      chainId: 19005,
      ws: null,
    },
    'stafi': {
      symbol: 'FIS',
      decimals: 12,
      chainId: 19006,
      ws: null,
    },
    'centrifuge': {
      symbol: 'RAD',
      decimals: 18,
      chainId: 19012,
      ws: null,
    },
    'subsocial': {
      symbol: 'SMN',
      decimals: 12,
      chainId: 19011,
      ws: null,
    },
    'crab': {
      symbol: 'CRING',
      decimals: 9,
      chainId: 19010,
      ws: null,
    },
    'chainx': {
      symbol: 'PCX',
      decimals: 8,
      chainId: 39,
      ws: null,
    },
    'substrate': {
      symbol: 'UNIT',
      decimals: 12,
      chainId: 19002,
      ws: null,
    },
  },
  currentChain: 'polkadot',
}
const getters = { //实时监听state值的变化(最新状态)
  isLoading(state) {
    return state.isLoading
  },
  account(state) {
    return state.account
  },
  currentChain(state) {
    return state.currentChain
  },
  chainList(state) {
    return state.chainList
  },
  chainNameList(state) {
    return state.chainNameList
  },
  selectedChain(state) {
    return state.selectedChain
  },
  chainInfo(state) {
    return state.chainList[state.currentChain]
  },
}
const mutations = {
  setLoading(state, val) {
    state.isLoading = val;
  },
  setAccount(state, val) {
    state.account = val;
    sessionStorage.setItem('account', val)
  },
  setCurrentChain(state, val) {
    state.currentChain = val;
    sessionStorage.setItem('currentChain', val)
  },
  setUser(state, chain) {
    state.chainList[chain].ws = new User(chain);
  },
  setChain(state, val) {
    state.currentChain = val;
    state.chainInfo = state.chainList[val];
    state.selectedChain = state.chainNameList[val];
  },
  setSelectedChain(state, val) {
    state.selectedChain = state.chainNameList[val];
  },
}
const actions = {
  setLoading(context, val) {
    context.commit('setLoading', val)
  },
  setAccount(context, val) {
    context.commit('setAccount', val)
  },
  setCurrentChain(context, val) {
    context.commit('setCurrentChain', val)
  },
  setUser(context, val) {
    context.commit('setUser', val)
  },
  setChain(context, val) {
    context.commit('setChain', val)
  },
  setSelectedChain(context, val) {
    context.commit('setSelectedChain', val)
  },
}
export default new Vuex.Store({
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
})
