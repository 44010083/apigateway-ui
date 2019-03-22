import Vue from 'vue'
import Router from 'vue-router'
import admin from '@/modules/admin/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',
      component: admin
    }
  ]
})
