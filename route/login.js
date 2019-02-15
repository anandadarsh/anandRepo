var express = require('express');
var frontController = require('../controller/FrontController.js');
var router = express.Router();

router.get('/', function(req,res){
	var sessionVar = req.session.msg;
		if(sessionVar){
			delete req.session.msg;
		}
	res.render('login',{msg:sessionVar});
});


router.post('/getLogin',frontController.getLogin)



module.exports= router;