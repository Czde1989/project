export default {
  state: {
    lifeData: []
  },
  getters: {
    getLifeData: state => state.lifeData,
    getLifeDetail: state => (id) => {
      const result = state.lifeData.filter(item => item._id === id)
      window.sessionStorage.setItem(id, JSON.stringify(result[0]))
      return result[0]
    }
  },
  mutations: {
    setLifeData (state, obj) {
      state.lifeData = obj.data
    },
    postStatus (state, obj) {
      state.lifeData.unshift(obj.data)
    },
    pushLifeData (state, obj) {
      state.lifeData = state.lifeData.concat(obj.data)
    }
  },
  actions: {
    set_LifeData ({commit}, obj) {
      commit('setLifeData', obj)
    },
    post_Status ({commit}, obj) {
      commit('postStatus', obj)
    },
    push_LifeData ({commit}, obj) {
      commit('pushLifeData', obj)
    }
  }
}
