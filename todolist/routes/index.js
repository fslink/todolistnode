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
	req.session.todolist.push();

})

module.exports = router;
