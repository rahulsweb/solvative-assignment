import Vue from 'vue'
import App from './App.vue'
/* eslint-disable */
import router from './router';
import axios from 'axios'
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

document.addEventListener('keydown', function(event) {
  if (event.keyCode === 191) { // 191 is the keycode for "/"
    const searchBox = document.querySelector('#search');
    searchBox.focus();
  }
});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
