import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import HelloWorld from '@/components/HelloWorld'
import Detail from '@/components/detail'
import Void from '@/components/void'

Vue.use(Router)

const routeur = new Router({
  // mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/test'
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/test',
      name: 'Test',
      component: Void
    },
    {
        path: '/login',
        name: 'Login',
        component: Void,
        meta: {
            requiresAuth: true
        }
    }
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
