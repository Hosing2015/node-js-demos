var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mongoose = require('mongoose');
mongoose.connect('mongodb://hfpp2012:hfpp2012@ds151068.mlab.com:51068/todos');

var todoSchema = new mongoose.Schema({
  item: String
});
var TodoModel = mongoose.model('Todo', todoSchema);

/* var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
  if (err) throw err;
  console.log('item saved');
});
var data = [ {item: 'get milk'}, {item: "walk dog"}, {item: 'kick some coding ass'} ];;
 */

module.exports = function (app) {
  app.get('/todo', function (req, res) {
    TodoModel.find({}, function (err, data) {// 查询全部
      if (err) throw err;
      res.render('todo', { todolist: data });
      console.log('get todoList---', data);
    });
  });

  app.post('/todo', urlencodedParser, function (req, res) {
    TodoModel(req.body).save(function (err, data) { // 添加
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req, res) {
    /* data = data.filter(function(todo) {
       return todo.item.replace(/ /g, "-") !== req.params.item;
     });*/
    TodoModel.find({ item: req.params.item.replace(/-/g, " ") }).remove(function (err, data) { // 删除
      if (err) throw err;
      res.json(data);
    });
  });
}
