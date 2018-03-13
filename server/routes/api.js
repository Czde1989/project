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

// 获取所有分类
router.get('/categories', function (req, res, next) {
  Category.find({}).sort({_id: -1}).exec(function (err, result) {
    if (err) {
      res.json(err);
      return;
    }
    res.json(result);
  })
});
// 获取指定Id的分类类名
router.get('/category/:id', function (req, res, next) {
  Category.findOne({
    _id: req.params.id
  }).then(function (rs) {
    res.json(rs);
  })
});
// 获取指定id的博客文章
router.get('/detail/:id', function (req, res, next) {
  Article.findOne({
    _id: req.params.id
  }).then(function (rs) {
    res.json(rs);
  })
});

// 添加分类
router.post('/add_cate', function (req, res, next) {
  var category = req.body.name;
  if (category) {
    Category.findOne({
      name: category
    }).then(function (rs) {
      if (rs) {
        res.json({
          'status': 'fail',
          'message': '该分类已经存在了'
        })
      } else {
        return new Category({name: category}).save()
      }
    }).then(function (rs) {
      if (rs) {
        res.json({
          'status': 'success',
          'message': '添加分类成功'
        })
      } else {
        res.json({
          'status': 'fail',
          'message': '添加分类失败'
        })
      }
    })
  }
});

// 添加文章
router.post('/post', function (req, res, next) {
  var data = req.body;
  new Article({
    title: data.title,
    desc: data.desc,
    content: data.content,
    category: data.categoryId,
    tags: data.tags
  }).save().then(function (rs) {
    res.json({
      'status': 'success',
      'message': '发表成功'
    });
  })
});

module.exports = router;
