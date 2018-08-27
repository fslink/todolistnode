var express = require('express');
var router = express.Router();
const fs = require('fs');
var compteur = 0;
var list = require('../data/tasks.json');

/* GET home page. */
router.get('/', function(req, res, next) {
	var result = checkCookie(req, res);
	console.log(result);
	var listPerso = [];
	list.forEach(function(element){
		if(element){
			if(element.id == req.cookies.id){
				listPerso.push(element);
			}
		}
	});

	res.render('index', { title: 'Liste des tâches', listPerso});
});

router.get('/addTask', function(req, res, next){
	var result = checkCookie(req, res);
	console.log(result);
	if(req.query.task){
		result = addTaskJson(req.cookies.id, req.query.task);
		console.log(result);
	}
	res.redirect('/');
});

router.get('/deleteTask', function(req, res, next){
	var result = checkCookie(req, res);
	list.forEach(function(element, index){
		if(element){
			console.log(element);
			console.log(req.query.idTask);
			if(element.id == req.query.idTask){
				delete list[index];
			}
		}
	});
	var data = JSON.stringify(list);
	fs.writeFileSync('./data/tasks.json', data);
	res.redirect('/');
});

// add a task in tasks.json with the user id
function addTaskJson(id, newTask){
	try{
		var row = {"id": id, "task": newTask};
		list.push(row);
		var data = JSON.stringify(list);
		fs.writeFileSync('./data/tasks.json', data);
		return 'data added';

	} catch(e){
		return e;
	}
}

function checkCookie(req, res){
  // check if client sent cookie
  var result = "";
  var cookie = req.cookies.id;
  if (cookie === undefined){
    // no: set a new cookie
  	var randomNumber=Math.random().toString();
	randomNumber=randomNumber.substring(2,randomNumber.length);
	res.cookie('id', randomNumber, { maxId: 900000, httpOnly: true });
	result = 'cookie created successfully';

  } 
  else
  {
    // yes, cookie was already present
    result = 'cookie already present';
  }

  return result;
}

module.exports = router;
