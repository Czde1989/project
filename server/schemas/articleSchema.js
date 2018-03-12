var mongoose = require('mongoose');

var artSchema = new mongoose.Schema({
  category: { // 关联字段-- 文章的分类id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  post_time: { // 添加时间
    type: Date,
    default: new Date()
  },
  views: { // 阅读数
    type: Number,
    default: 0
  },
  title: String,
  desc: {  // 摘要
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  comments: {  // 评论列表
    type: Array,
    default: []
  },
  update_time: { // 最后更新时间
    type: Date,
    default: new Date()
  },
  tags: { // 文章标签
    type: Array,
    default: []
  }
});

artSchema.statics = {
  getAll: function (cb) {
    return this.find({}).sort({_id: -1}).exec(function (err, result) {
      if (err) {
        return cb(err);
      }
      cb(null, result);
    })
  }
};

module.exports = artSchema;
