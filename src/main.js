import Vue from 'vue'
import Router from 'vue-router'

import App from './App.vue'
import Homepage from './components/Homepage'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Forgot from './components/auth/Forgot'
import Hall from './components/chat/Hall'
import Chat from './components/chat/Chat'
import GroupChat from './components/chat/GroupChat'
import Settings from './components/misc/Settings'

import 'jquery'
import 'popper.js'
import 'bootstrap/js/src/index'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    },
    {
      path: '/hall',
      name: 'Hall',
      component: Hall
    },
    {
      path: '/chat/:chatId',
      name: 'Chat',
      component: Chat
    },
    {
      path: '/group/:groupId',
      name: 'GroupChat',
      component: GroupChat
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
  ]
});

new Vue({
  render: h => h(App), router
}).$mount('#app');
