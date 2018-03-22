export default {
  state: {
    showPreviewImage: false,
    previewImageList: []
  },
  getters: {
    getShowPreviewImage: state => state.showPreviewImage,
    getPreviewImageList: state => state.previewImageList
  },
  mutations: {
    setShowPreviewImage (state, obj) {
      state.showPreviewImage = obj.data
    },
    setPreviewImageList (state, obj) {
      state.previewImageList.push(obj.data)
    },
    clearPreviewImageList (state) {
      state.previewImageList = []
    }
  },
  actions: {
    set_ShowPreviewImage ({commit}, obj) {
      commit('setShowPreviewImage', obj)
    },
    set_PreviewImageList ({commit}, obj) {
      commit('setPreviewImageList', obj)
    },
    clear_PreviewImageList ({commit}) {
      commit('clearPreviewImageList')
    }
  }
}
