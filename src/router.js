import Vue from 'vue'
import VueRouter from 'vue-router'

const routes = [
  { path: '/', component: () => import('./pages/simple.vue') },
  { path: '/complex', component: () => import('./pages/complex.vue') },
]

const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
})

Vue.use(VueRouter)

export default router
