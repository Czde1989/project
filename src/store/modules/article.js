const articleState = {
  state: {
    artList: [],
    detailData: {}
  },
  getters: {
    getArtList: state => state.artList,
    getDetailData: state => state.detailData
  },
  mutations: {
    setArtList (state, obj) {
      state.artList = obj.data
      window.sessionStorage.setItem('CZDE_BLOG_ARTICLES', JSON.stringify({articles: obj.data}))
    },
    setDetailData (state, obj) {
      state.detailData = obj.data
      window.sessionStorage.setItem('CZDE_BLOG_ARTICLE_DETAIL', JSON.stringify({data: obj.data}))
    },
    postComment (state, obj) {
      state.detailData.currentArticle = obj.data
    }
  },
  actions: {
    set_ArtList ({commit}, obj) {
      commit('setArtList', obj)
    },
    set_DetailData ({commit}, obj) {
      commit('setDetailData', obj)
    },
    post_Comment ({commit}, obj) {
      commit('postComment', obj)
    }
  }
}

export default articleState
