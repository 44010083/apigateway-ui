import Vue from 'vue'
import Router from 'vue-router'
//vue-resource
import Resource from 'vue-resource'
import admin from '@/modules/admin/home'
import config from '@/modules/admin/config'
Vue.use(Router)
Vue.use(Resource)
const router = new Router({
  mode: 'history',
  base: '#',
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin
    },
    {
      path: '/config',
      name: 'config',
      component: config
    }
  ]
})

export default router
