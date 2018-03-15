const detail = {
  state: {
    artDetail: {}
  },
  getters: {
    getArtDetail: state => state.artDetail
  },
  mutations: {
    setArtDetail (state, obj) {
      state.artDetail = obj.data
    }
  },
  actions: {
    set_ArtDetail ({commit}, obj) {
      commit('setArtDetail', obj)
    }
  }
}

export default detail
