import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/index.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About/index.vue')
  },
  {
    path: '/empreendimento',
    name: 'Enterprise',
    component: () => import('../pages/Enterprise/index.vue')
  },
  {
    path: '/ancoragem',
    name: 'Anchoring',
    component: () => import('../pages/Anchoring/index.vue')
  },
  {
    path: "/conheca",
    name: "Know",
    component: () => import('../pages/Know/index.vue')
  },
  {
    path: "/localizacao",
    name: "Local",
    component: () => import('../pages/Local/index.vue')
  },
  {
    path: '/locacoes',
    name: "Leases",
    component: () => import('../pages/Leases/index.vue')
  },
  {
    path: "/lojas",
    name: "Stores",
    component: () => import('../pages/Stores/index.vue')
  }

]

const router = new VueRouter({
  routes
})

export default router
