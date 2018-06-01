const express = require("express");
const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");
//过滤数据库返回字段
const _filter = { pwd: 0, __v: 0 };

Router.get("/list", function(req, res) {
  //清除所有
  // User.remove({}, function(err, doc) {
  //   console.log('清除所有用户！')
  // })
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

Router.get("/info", function(req, res) {
  //cookie校验
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  User.findById({ _id: userid }, _filter, (err, doc) => {
    if (err) {
      return res.json({ code: 1, msg: "后端出错了" });
    }
    return res.json({ code: 0, data: doc });
  });
});

Router.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  //查询指定用户，不显示pwd字段
  User.findOne({ user, pwd }, { pwd: 0 }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或密码错误！" });
    }
    res.cookie("userid", doc._id); //设置cookie
    return res.json({ code: 0, data: doc });
  });
});

Router.post("/register", function(req, res) {
  console.log(req.body);
  const { user, pwd, type } = req.body;
  //判断是否存在
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: "用户名重复！" });
    }
    // User.create({ user, pwd, type }, function(err, doc) {
    //   if (err) {
    //     return res.json({ code: 1, msg: "新建用户失败！" });
    //   }
    //   return res.json({ code: 0 });
    // });

    //用save代替create,保存的同时拿到用户id
    const userModel = new User({ user, type, pwd: pwd });
    userModel.save((err, doc) => {
      if (err) {
        return res.json({ code: 1, msg: "后端出错了" });
      }
      const { user, type, _id } = doc;
      res.cookie("userid", _id);
      return res.json({ user, type, _id });
    });
  });
});

Router.post('/update', (req,res) => {
  const userid = req.cookies.userid
  if(!userid) {
    return json.dumps({code: 1})
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, (err, doc) => {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

module.exports = Router;
