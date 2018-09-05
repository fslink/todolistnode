var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.send("Bienvenue sur la todo");
})

.get('/todo', function(req, res, next){
	res.render('index', {title: 'To do List', todolist: req.session.todolist});
})

.post('/todo/ajouter', function(req, res, next){
	if(req.body.newtask != ''){
		req.session.todolist.push(req.body.newtask);
	}
	res.redirect('/todo');
})

.get('/todo/supprimer/:id', function(req, res){
	if(req.params.id != ''){
		req.session.todolist.splice(req.params.id, 1);
	}
	res.redirect('/todo');
})

module.exports = router;
