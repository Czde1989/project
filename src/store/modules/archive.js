const formatDate = (time) => {
  let date = new Date(time)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  return year + '年' + month + '月'
}

export default {
  state: {
    categories: [],
    allArticles: [],
    all: []
  },
  getters: {
    getCategories: state => () => {
      const result = []
      for (let value of state.categories) {
        const item = {
          category: value
        }
        item.cateArt = state.all.filter((art) => {
          return value._id === art.category
        })
        result.push(item)
      }
      return result
    },
    getAllArticles: state => () => {
      const result = {}
      for (let value of state.allArticles) {
        const name = formatDate(value.post_time)
        if (!result.hasOwnProperty(name)) {
          result[name] = {
            time: name,
            children: [value]
          }
        } else {
          result[name].children.push(value)
        }
      }
      return result
    },
    getCategoryName: state => (id) => {
      return state.categories.filter((category) => {
        return category._id === id
      })
    }
  },
  mutations: {
    setCategories (state, obj) {
      state.categories = obj.data
    },
    setAllArt (state, obj) {
      state.allArticles = obj.data
    },
    setAll (state, obj) {
      state.all = obj.data
    }
  },
  actions: {
    set_Categories ({commit}, obj) {
      commit('setCategories', obj)
    },
    set_AllArt ({commit}, obj) {
      commit('setAllArt', obj)
    },
    set_All ({commit}, obj) {
      commit('setAll', obj)
    }
  }
}
