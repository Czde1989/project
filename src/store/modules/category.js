const state = {
  categories: []
}

const getters = {
  getCategories: state => state.categories
}

const actions = {
  set_Categories ({commit}, obj) {
    commit('setCategories', obj)
  }
}

const mutations = {
  setCategories (state, obj) {
    state.categories = obj.data
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
