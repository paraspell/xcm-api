import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'buefy/dist/buefy.css'
import VueCompositionAPI from '@vue/composition-api'
import Buefy from 'buefy';

// internal icons
 
Vue.use(VueCompositionAPI)
Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
