const express = require('express')
const mongoose = require('mongoose')

//连接mongo,使用imooc(会自动新建imooc)
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
    console.log('mongo connect success!');
    
})
//创建user表
const User = mongoose.model('user', new mongoose.Schema({
    name: {type: String, require:true},
    age: {type: Number, require:true}
}))

////新建一条数据
// User.create({
//     name: 'lisi',
//     age: 19
// }, function(err, doc) {
//     //新建数据后的回调
//     if(!err) {
//         console.log(doc);
//     }else{
//         console.log(err);
        
//     }
// })

//删除数据
// User.remove({age:18}, function (err, doc) {
//     console.log(doc);
// })

//更新数据
// User.update({'name': 'lisi'}, {'$set':{age:26}}, function(err, doc){
//     console.log(doc);
// })

//创建app
const app = express()

app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1>')
})

app.get('/data', function (req,res) {
    //查询并返回数据
    User.find({}, function(err, doc) {
        return res.json(doc)
    })
    // res.json({name: 'imooc', type: 'IT互联网'})
})

app.listen(9093, function () {
    console.log('Node app start at port 9093');

})