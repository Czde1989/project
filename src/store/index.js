import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import article from './modules/article'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    article
  }
})
