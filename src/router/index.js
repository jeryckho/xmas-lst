import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import List from '@/components/list'
import Detail from '@/components/detail'
import Void from '@/components/void'

Vue.use(Router)

const routeur = new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/listes'
    },
    {
      path: '/listes',
      name: 'List',
      component: List
    },
    {
      path: '/liste/:slug',
      name: 'Detail',
      component: Detail
    },
  ]
})

routeur.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
      next('/')
  } else if (requiresAuth && currentUser) {
      next()
  } else {
      next()
  }
})

export default routeur
