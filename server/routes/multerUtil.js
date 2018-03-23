const multer = require('multer');

const storage = multer.diskStorage({
  // 设置上传后文件路径，uploads文件夹会自动创建。
  destination:  './public/uploads',
  // 给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + Math.random()*1000 + 1 + "." + fileFormat[fileFormat.length - 1]);
  }
});

// 添加配置文件到multer对象。
const upload = multer({
  storage: storage
});

module.exports = upload;
