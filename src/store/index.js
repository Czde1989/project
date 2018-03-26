import Vue from 'vue'
import Vuex from 'vuex'

import articleState from './modules/article'
import bbsState from './modules/bbs'
import upload from './modules/upload'
import lifeState from './modules/life'
import archive from './modules/archive'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    articleState,
    bbsState,
    upload,
    lifeState,
    archive
  }
})
