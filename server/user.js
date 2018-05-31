const express = require("express");
const Router = express.Router();
const model = require("./model");
const User = model.getModel("user");

Router.get("/list", function(req, res) {
  //清除所有
  // User.remove({}, function(err, doc) {
  //   console.log('清除所有用户！')
  // })
  User.find({}, function(err, doc) {
    return res.json(doc);
  });
});

Router.post("/login", function(req, res) {
  const { user, pwd } = req.body;
  User.findOne({ user, pwd }, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: "用户名或密码错误！" });
    }
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
    User.create(
      {
        user,
        pwd: pwd,
        type
      },
      function(err, doc) {
        if (err) {
          return res.json({ code: 1, msg: "新建用户失败！" });
        }
        return res.json({ code: 0 });
      }
    );
  });
});

Router.get("/info", function(req, res) {
  //cookie校验

  return res.json({ code: 1 });
});

module.exports = Router;
