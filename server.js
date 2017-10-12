var express  = require('express');
var mongoose = require('mongoose');

var options = { server: { socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000 } }};
mongoose.connect('mongodb://novecal:email@ds113935.mlab.com:13935/novecal_email', options, function(err) {

});

var contactSchema = mongoose.Schema({
  email: String
});

var ContactModel = mongoose.model('Contact', contactSchema);

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});

app.get('/contact', function(req, res){
  console.log(req.query);
  var contact = new ContactModel ({
    email:req.query.email
  });
  contact.save(function (error, contact){
    res.render('index');
  });
});

var userName = 'novecal';
var mdp = 'Novecal2017';

app.get('/form', function(req, res){
  if(req.query.userName == userName && req.query.mdp == mdp){
    ContactModel.find(function (err, contacts){
      var mailingList = contacts;
      console.log(mailingList);
      res.render('mailingList', {list:mailingList});
    });
  } else {
    res.render('form');
  }
});

var port = (process.env.PORT || 8082);
app.listen(port, function (){
  console.log("Server listening on port 8082");
});
