import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { test } from './test.store';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    test
  }
});