var express = require('express');
var router = express.Router();

var Article = require('../model/Article');
var Category = require('../model/Category');
var BBS = require('../model/Bbs');

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
  const artId = req.params.id;
  const data = {};
  // 上一篇
  Article.find({_id: {"$lt": artId}}).limit(1).sort({_id: -1}).then(function (prevArticle) {
    return data.prevArticle = prevArticle[0];
  });
  // 下一篇
  Article.find({_id: {"$gt": artId}}).limit(1).sort({_id: 1}).then(function (nextArticle) {
    return data.nextArticle = nextArticle[0];
  });
  // 当前传入文章id对应的文档
  Article.findOne({
    _id: artId
  }).then(function (art) {
    art.views ++;
    art.save().then(function (rs) {
      data.currentArticle = rs;
      // 查找分类名称
      Category.findOne({_id: rs.category}).then(function (category) {
        data.currentArticle.category = category;
        res.json(data);
      })
    });
  })
});

// 点赞
router.get('/add_like/:id', function (req, res, next) {
  Article.findOne({
    _id: req.params.id
  }).then(function (art) {
    art['like'] += 1;
    art.save().then(function (rs) {
      res.json(rs);
    })
  })
});

// 获取留言列表
router.get('/board', function (req, res, next) {
  BBS.find({}).sort({_id: -1}).exec(function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
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

// 添加评论
router.post('/add_comment', function (req, res, next) {
  const data = req.body;
  Article.findOne({
    _id: data.id
  }).then(function (art) {
    data['time'] = new Date();
    art.comments.push(data);
    art.save().then(function (rs) {
      res.json(rs);
    })
  })
});

// 发表留言
router.post('/add_msg', function (req, res, next) {
  const data = req.body;
  new BBS({
    username: data.username,
    content: data.content,
    email: data.email,
    website: data.website
  }).save().then(function (rs) {
    res.json(rs);
  })
});

// 回复留言
router.post('/reply_msg', function (req, res, next) {
  const data = req.body;
  BBS.findOne({
    _id: data.id
  }).then(function (msg) {
      msg.reply.push({
        username: data.username,
        content: data.content,
        email: data.email,
        website: data.website,
        time: new Date()
      });
      msg.save().then(function (rs) {
        res.json(rs);
      })
  })
});

module.exports = router;
