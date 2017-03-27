var express = require('express');
var mongojs = require('mongojs');
var parser = require('body-parser');

var app = express();
var db = mongojs("familyEMR", ['familyEMR']);


app.use(express.static(__dirname + "/public"));
app.use(parser.json()); 

app.get('/records', function(req, res){
	db.familyEMR.find(function (err, docs) {
		res.json(docs);
	});
});

app.get('/records/:id', function(req, res){
	var id = req.params.id;
	db.familyEMR.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

app.post('/records', function (req, res) {
	 db.familyEMR.insert(req.body, function(err, doc) {
	 	res.json(doc);
	 });
});

app.put('/records/:id', function (req, res) {
	var id = req.params.id;
	db.familyEMR.findAndModify({
		query: {_id: mongojs.ObjectId(id)}, 
		update: { $set: {systolic: req.body.systolic, diastolic: req.body.diastolic, map: req.body.map, pulse: req.body.pulse } }, 
		new: true }, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/records/:id', function (req, res) {
	var id = req.params.id;
	db.familyEMR.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});

app.listen(3000);
console.log("Server running 3000...")