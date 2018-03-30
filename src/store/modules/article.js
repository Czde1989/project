const articleState = {
  state: {
    artList: [],
    count: 0,
    detailData: {},
    showLoading: true,
    alert: {
      show: false,
      type: 'info',
      text: ''
    }
  },
  getters: {
    getArtCount: state => state.count,
    getArtList: state => state.artList,
    getDetailData: state => state.detailData,
    getShowLoading: state => state.showLoading,
    getAlert: state => state.alert
  },
  mutations: {
    setArtList (state, obj) {
      state.artList = obj.data
      // window.sessionStorage.setItem('CZDE_BLOG_ARTICLES', JSON.stringify({articles: obj.data}))
    },
    setArtCount (state, obj) {
      state.count = obj.data
    },
    setDetailData (state, obj) {
      state.detailData = obj.data
      // window.sessionStorage.setItem('CZDE_BLOG_ARTICLE_DETAIL', JSON.stringify({data: obj.data}))
    },
    postComment (state, obj) {
      state.detailData.currentArticle = obj.data
    },
    setShowLoading (state, obj) {
      state.showLoading = obj.data
    },
    setAlert (state, obj) {
      state.alert = obj.data
    }
  },
  actions: {
    set_ArtList ({commit}, obj) {
      commit('setArtList', obj)
    },
    set_ArtCount ({commit}, obj) {
      commit('setArtCount', obj)
    },
    set_DetailData ({commit}, obj) {
      commit('setDetailData', obj)
    },
    post_Comment ({commit}, obj) {
      commit('postComment', obj)
    },
    set_ShowLoading ({commit}, obj) {
      commit('setShowLoading', obj)
    },
    set_Alert ({commit}, obj) {
      commit('setAlert', obj)
    }
  }
}

export default articleState
