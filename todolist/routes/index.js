var express = require('express');
var router = express.Router();
const fs = require('fs');
var compteur = 0;
var list = require('../data/tasks.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Liste des tâches', list});
});

router.get('/addTask', function(req, res, next){
  // check if client sent cookie
  var cookie = req.cookies.id;
  if (cookie === undefined)
  {
    // no: set a new cookie
    fs.readFile('./data/compteur.txt', 'utf8', function(err, data){
	  	if(err) throw err;
	  	var randomNumber=Math.random().toString();
    	randomNumber=randomNumber.substring(2,randomNumber.length);
		fs.writeFileSync('./data/compteur.txt', randomNumber);
		res.cookie('id',compteur, { maxId: 900000, httpOnly: true });
   		console.log('cookie created successfully');
  	});
  	if(req.query.task != undefined){
  		addTaskJson(compteur, req.query.task);
  	}
  	
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
   	if(req.query.task != undefined){
  		addTaskJson(cookie, req.query.task);
  	}

  }

res.redirect('/');

});

function addTaskJson(id, newTask){
	try{
		var row = {"id": id, "task": newTask} ;
		list.push(row);
		var data = JSON.stringify(list);
		var options = ['a+'];
		fs.writeFile('./data/tasks.json', data);
		return 'data added';

	} catch(e){
		return e;
	}
	
}

module.exports = router;
