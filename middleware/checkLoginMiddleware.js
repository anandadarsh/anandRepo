exports.isLogin = function(req, res, next){
	var isLogin =  req.session.username;
	if(isLogin){
		next();
	}else{
		req.session.msg = 'Plese login with your Account';
		res.redirect('/login');
	}
}