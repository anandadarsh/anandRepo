var express = require('express');
var frontController = require('../controller/FrontController.js');
var router = express.Router();

router.get('/', function(req,res){
		req.session.destroy();
		res.locals.userName = null;
		res.locals.email = null;
	res.render('login');
});


module.exports= router;