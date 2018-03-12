var express = require('express');
var router = express.Router();

var Article = require('../model/Article');
var Category = require('../model/Category');

// 获取所有文章
router.get('/articles', function(req, res, next) {
  Article.getAll(function (err, data) {
    if (err) {
      res.json(err);
      return;
    }
    res.json(data);
  })
});

// 添加文章
router.post('/post', function (req, res, next) {
  var data = req.body;
  new Article({
    title: data.title,
    desc: data.desc,
    content: data.content
  }).save().then(function (rs) {
    res.json({
      'status': 'success',
      'message': '发表成功'
    });
  })
});

module.exports = router;
