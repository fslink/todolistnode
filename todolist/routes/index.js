var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	req.session.todolist.push({task: 'manger des fraises'});
	res.send("Bienvenue sur la todo");
})

.get('/todo', function(req, res, next){
	console.log(req.session.todolist);
})

.post('/todo/ajouter', function(req, res, next){
})

module.exports = router;
