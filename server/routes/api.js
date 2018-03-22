const express = require('express');
const router = express.Router();
const multer = require('./multerUtil');

const Article = require('../model/Article');
const Category = require('../model/Category');
const BBS = require('../model/Bbs');
const Life = require('../model/Life');

// 获取所有文章
router.get('/articles', function(req, res, next) {
  const query = req.query;
  const pageNumber = req.query.page || 1;
  const limit = 5;

  const data = { errno: 0, currentPageIndex: pageNumber, msg: '请求成功' };

  Article.find({}).count().exec(function (err, result) {
    if (result) {
      data.pageTotal = Math.ceil(result / limit);
      data.articleCount = result
      if (pageNumber > data.pageTotal) {
        data.errno = 4;
        data.msg = '没有更多博文了';
        res.json(data);
        return;
      }
      Article.find({}).sort({_id: -1}).skip((pageNumber-1) * limit).limit(limit).exec(function (err, result) {
        if (err) {
          data.errno = 9;
          data.msg = '未知错误，请留言博主解决！';
          data.data = err;
          res.json(data);
          return;
        }
        data.data = result;
        res.json(data)
      });
    }
  });
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
  Article.find({}).count().exec(function (err, rs) {
    return data.articleCount = rs
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
  const data = {};
  Article.find({}).count().exec(function (err, count) {
    return data.articleCount = count;
  });

  BBS.find({}).sort({_id: -1}).exec(function (err, result) {
    if (err) {
      data.data = err;
    } else {
      data.data = result;
    }
    res.json(data);
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
// 发表生活点滴
router.post('/life', multer.array('life-pic', 9), function (req, res) {
  const data = {};
  const files = req.files;
  // data.content = req.body.content;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].filename) data.pictures.push('/uploads/' + file[i].filename)
    }
  }
  console.log(data);
  res.json({
    "msg": "ok"
  });
});

module.exports = router;
