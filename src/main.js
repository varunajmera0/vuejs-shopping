import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import { store } from './store'
import * as firebase from 'firebase'
import pluralize from 'pluralize'
import AlertCmp from './Shared/Alert.vue'
import { StripeCheckout } from 'vue-stripe'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('pluralize', pluralize)
Vue.component('app-alert', AlertCmp)
Vue.component('stripe-checkout', StripeCheckout)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: ''
    })
    this.$store.dispatch('loadCategories')
    this.$store.dispatch('loadProducts')
    this.$store.dispatch('loadSliders')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
