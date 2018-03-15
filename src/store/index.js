import Vue from 'vue'
import Vuex from 'vuex'
import category from './modules/category'
import article from './modules/article'
import detail from './modules/detail'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    article,
    detail
  }
})
