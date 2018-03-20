export default {
  state: {
    msgList: [],
    replyMsg: {
      msg: null,
      showInput: false
    }
  },
  getters: {
    getMsgList: state => state.msgList,
    getShowInputArea: state => state.replyMsg.showInput,
    getReplyMsg: state => state.replyMsg.msg
  },
  mutations: {
    setMsgList (state, obj) {
      state.msgList = obj.data
      window.sessionStorage.setItem('CZDE_BLOG_BBS', JSON.stringify({msgList: obj.data}))
    },
    pushMsgList (state, obj) {
      state.msgList.unshift(obj.data)
    },
    setReplyMsg (state, obj) {
      state.replyMsg = obj.data
    }
  },
  actions: {
    set_MsgList ({commit}, obj) {
      commit('setMsgList', obj)
    },
    push_MsgList ({commit}, obj) {
      commit('pushMsgList', obj)
    },
    set_ReplyMsg ({commit}, obj) {
      commit('setReplyMsg', obj)
    }
  }
}
