// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import VueCordova from 'vue-cordova'
import VueHead from 'vue-head'
import createPersistedState from "vuex-persistedstate";


import App from './App'
import router from './router'

Vue.use(Vuex)
Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.use(VueCordova)
Vue.use(VueHead)

// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3000') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}

/* eslint-disable no-new */
const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    red: false,
    data: 'none',
    done: false,
    sending: false,
    route_is: '',
    student_data: null,
    progress: '',
    signin_type: '',
    received: { name: 'null',
      reg: 'null' },
    name: { name: 'null',
      reg: 'null' }
  },
  getters: {
    data: state => state.data,
    red: state => state.red,
    signin_type: state => state.signin_type,
    done: state => state.done,
    received: state => state.received,
    progress: state => state.progress,
    sending: state => state.sending,
    name: state => state.name,
    student_data: state => state.student_data
  },
  mutations: {
    addData: (state, text) => {
      state.data = text
    },
    studentData: (state, data) => {
      state.student_data = data
    }
  },
});
window.store = store
/* if (localStorage.getItem('name') != undefined) {
  let somedata = JSON.parse(localStorage.getItem('name'))
  window.store.state.name.name = somedata.name
  window.store.state.name.reg = somedata.reg

} */

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  head: {
    meta: [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      }
    ]
  }
})
