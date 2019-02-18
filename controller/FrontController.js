//require model here
const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var contactModel = require('../model/contactModel');
const bcrypt = require('bcrypt');


//save contact data
exports.saveContact = [

  body('name', 'Name is required').isLength({ min: 1 }).trim(),
  body('email', 'Email is required').isLength({ min: 1 }).trim(),
  body('password', 'Password is required').isLength({ min: 1 }).trim(),
  body('txt', 'Txt is required').isLength({ min: 1 }).trim(),
  
  sanitizeBody('name').trim().escape(),
   sanitizeBody('email').trim().escape(),
    sanitizeBody('password').trim().escape(),
     sanitizeBody('txt').trim().escape(),

function(req, res,next){
		    const errors = validationResult(req);

		   if(!errors.isEmpty()){
		   	req.session.error = errors.array();
		   	 res.redirect('/contact');
		   }
		   else{
		   	req.session.error = null;
				    bcrypt.hash(req.body.password, 10, function(err, hash) {
				     MyformData = {
				      	'name':req.body.name,
				      	'email':req.body.email,
				      	'password':hash,
				      	'txt':req.body.txt,
				      	
				      };
					    contactModel.saveContact(MyformData, function callback(err, success){
							if(err) throw err;
							else
							//res.status(201).json({ msg: 'User is created' });
							req.session.msg = 'Contact has been Saved';
							res.redirect('/contact');
						});
				    });

		   }
  
     }

]



//get contact data..
exports.getContactData = function(req,res){
	contactModel.getContactData(function callback(err,result){
		if(err) throw err;
		var sess = req.session.msg;
		if(sess){
			delete req.session.msg;
		}
		res.render('contact-data',{data:result,msg:sess});
	});
}

exports.deleteContact = function(req,res){
	iid = req.params.id;
	contactModel.deleteContact(iid, function(err,success){
			if(err) throw err;
			req.session.msg = "Record Has been deleted";
			res.redirect('/contact/contact-data');
	});

}

exports.getContactDataById = function(req,res){
	iid = req.params.id;
	contactModel.getContactDataById(iid, function(err,data){
		if(err) throw err;
		res.render('edit_contact',{mydata:data})

	});
}
exports.updateContact = function(req, res){

	contactModel.getContactDataById(req.params.id, function(err,data){
		if(err) throw err;
		upassword = data[0].password;

	MyformData = {
	      	name :req.body.name,
	      	email :req.body.email,
	      	txt :req.body.txt,
	      	password:upassword
	      };

     var iid = req.params.id;
		contactModel.updateContact(MyformData,iid, function(err, success){
		if(err) throw err;
		req.session.msg = 'Recode Has be update';
		res.redirect('/contact/contact-data');
		 })
	})
}

exports.getLogin = function(req,res){
	contactModel.getdataByEmailId(req.body.email,function(err,data){
		if(err) throw err;
		if(data){
				hash = data.password;
				bcrypt.compare(req.body.password, hash, function(err, rese) {
    				if(rese){
    					req.session.username = data.name;
    					req.session.email  = data.email;
    					res.redirect('/contact');
    				} else{
    					req.session.msg = 'Username And Password Was not correct!!';
						res.redirect('/login');
    				}
 				});
		}else{
			req.session.msg = 'Username And Password Was not correct!!';
			res.redirect('/login');
		}
	})
   
}