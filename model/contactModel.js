var mongojs = require('mongojs');
var db = mongojs(process.env.DB_NAME,['contact']);

exports.saveContact = function(MyformData,callback){
	db.contact.insert(MyformData,callback);
}

exports.getContactData = function(callback){
	db.contact.find(callback);
}

exports.deleteContact =function(id,callback){
	db.contact.remove({"_id": mongojs.ObjectId(id)},callback)
}

exports.getContactDataById =function(id,callback){
	db.contact.find({"_id": mongojs.ObjectId(id)},callback)
}

exports.updateContact = function(MyformData,id, callback){
	db.contact.update({"_id":mongojs.ObjectId(id)},MyformData,callback);
}

exports.getLogin = function(loginData,callback){
	db.contact.findOne({'email':loginData.email,'password':loginData.password},callback);
}

exports.getdataByEmailId = function(emailId,callback){
	db.contact.findOne({'email':emailId},callback);
}