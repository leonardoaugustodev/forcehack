import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    toast: {},
    priorities: [],
    statuses: [],
  },
  mutations: {
    showToast(state, toast) {
      state.toast = toast;
    },

    populateStatuses(state, statuses) {
      state.statuses = statuses;
    },

    populatePriorities(state, priorities) {
      state.priorities = priorities;
    },
  },
  actions: {
  },
  modules: {
  },
});
