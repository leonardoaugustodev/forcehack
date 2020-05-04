import Vue from 'vue';
import Icon from 'vue-awesome/components/Icon.vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './services/api';
import 'vue-awesome/icons';

Vue.config.productionTip = false;
Vue.component('v-icon', Icon);
Vue.prototype.$http = api;
Vue.prototype.$toast = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
