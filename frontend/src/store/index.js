import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toast: {},
  },
  mutations: {
    showToast(state, toast) {
      console.log('toast showed');
      state.toast = toast;
    },
  },
  actions: {
  },
  modules: {
  },
});
