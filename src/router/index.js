import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 父路由
let chain = ['kusama', 'edgeware', 'polkadot', 'kulupu', 'plasm', 'stafi', 'centrifuge', 'subsocial', 'crab', 'chainx', 'substrate'];
// 首页路由
let routes = [{
  path: '/',
  redirect: { name: 'polkadot' }
}];
chain.forEach((val) => {
  routes = routes.concat([{
    path: '/' + val,
    name: val,
    component: () => import ('@/components/home'),
  }
  ])
})
export default new Router({
  // mode: 'history',
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
