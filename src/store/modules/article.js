const article = {
  state: {
    artLists: []
  },
  getters: {
    getArtLists: state => state.artLists
  },
  mutations: {
    setArtLists (state, obj) {
      state.artLists = obj.data
    }
  },
  actions: {
    set_ArtLists ({commit}, obj) {
      commit('setArtLists', obj)
    }
  }
}

export default article
