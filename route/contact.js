var express = require('express');
var frontController = require('../controller/FrontController.js');
var middleWare = require('../middleware/checkLoginMiddleware');
var route = express.Router();
var sessionVar;

	route.get('/',function(req, res){
		sessionVar = req.session.msg;
		valerror = req.session.error
		if(sessionVar || valerror){
			delete req.session.msg;
			delete req.session.error;
				
		}
		res.render('contact',{msg:sessionVar,errors:valerror}); 
		
	});
	
	//edit

	route.get('/edit/:id',middleWare.isLogin,frontController.getContactDataById)

	route.get('/contact-data',middleWare.isLogin,frontController.getContactData)
	
	route.post('/save-data',frontController.saveContact);
	
	route.get('/delete/:id',middleWare.isLogin, frontController.deleteContact);

	route.post('/update-data/:id',middleWare.isLogin,frontController.updateContact)


module.exports = route;	


