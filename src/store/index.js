import Vue from 'vue'
import Vuex from 'vuex'

import articleState from './modules/article'
import bbsState from './modules/bbs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    articleState,
    bbsState
  }
})
