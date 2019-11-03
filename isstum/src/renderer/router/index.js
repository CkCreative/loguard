import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'welcome-view',
      component: require('@/components/Tokens').default
    },
    {
      path: '/all',
      name: 'all_data',
      component: require('@/components/AllData').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
