var express = require('express');
var frontController = require('../controller/FrontController.js');
var middleWare = require('../middleware/checkLoginMiddleware');
var route = express.Router();
var sessionVar;

	route.get('/',function(req, res){
		sessionVar = req.session.msg;
		if(sessionVar){
			delete req.session.msg;
		}
		res.render('contact',{msg:sessionVar}); 
		
	});
	
	//edit

	route.get('/edit/:id',middleWare.isLogin,frontController.getContactDataById)

	route.get('/contact-data',middleWare.isLogin,frontController.getContactData)
	
	route.post('/save-data',frontController.saveContact);
	
	route.get('/delete/:id',middleWare.isLogin, frontController.deleteContact);

	route.post('/update-data/:id',middleWare.isLogin,frontController.updateContact)


module.exports = route;	


