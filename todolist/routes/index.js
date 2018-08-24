var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Liste des tâches'});
});

router.get('/addTask', function(req, res, next){
  // check if client sent cookie
  var cookie = req.cookies.id;
  if (cookie === undefined)
  {
    // no: set a new cookie
    var randomNumber=Math.random().toString();
    randomNumber=randomNumber.substring(2,randomNumber.length);
    res.cookie('id',randomNumber, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }

var student = {  
    name: 'Mike',
    age: 23, 
    gender: 'Male',
    department: 'English',
    car: 'Honda' 
};

var data = JSON.stringify(student);
var options = ['a+'];
fs.writeFileSync('./data/tasks.json', data, options);
res.send('OK gros');

});

module.exports = router;
