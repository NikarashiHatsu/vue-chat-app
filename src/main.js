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
import ChangeUsername from './components/misc/ChangeUsername'
import ChangeEmail from './components/misc/ChangeEmail'
import ChangePassword from './components/misc/ChangePassword'

import 'jquery'
import 'popper.js'
import 'bootstrap/js/src/index'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

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
    {
      path: '/settings/change_username',
      name: 'ChangeUsername',
      component: ChangeUsername
    },
    {
      path: '/settings/change_email',
      name: 'ChangeEmail',
      component: ChangeEmail
    },
    {
      path: '/settings/change_password',
      name: 'ChangePassword',
      component: ChangePassword
    }
  ]
});

new Vue({
  render: h => h(App), router
}).$mount('#app');
