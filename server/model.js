const mongoose = require("mongoose");

//连接mongo,使用imooc(会自动新建imooc)
const DB_URL = "mongodb://localhost:27017/imooc";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", function() {
  console.log("mongo connect success!");
});

const models = {
  user: {
    user: { type: String, require: true },
    pwd: { type: String, require: true },
    type: { type: String, require: true },
    avatar: { type: String },
    desc: { type: String },
    title: { type: String },
    company: { type: String },
    salary: { type: String }
  },
  chat: {
    chatid: { type: String, require: true },
    from: { type: String, require: true },
    to: { type: String, require: true },
    read: { type: Boolean, require: false },
    content: { type: String, require: true, default: "" },
    create_time: { type: Number, require: true, default: new Date().getTime() }
  }
};

for (const key in models) {
  if (models.hasOwnProperty(key)) {
    mongoose.model(key, new mongoose.Schema(models[key]));
  }
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name);
  }
};
