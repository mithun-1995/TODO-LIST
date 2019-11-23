var express = require('express');
var router = express.Router();
var path = require('path');
var filePath = path.join(__dirname, 'LocalStorage.json');
var service = require('./service')

var fs = require('fs');

/* GET customer listing. */
router.get('/', async function (req, res, next) {
	var username = req.query.username;
	var password = req.query.password;
    console.log(req.query)
	service.getData(function (dataObj) {
		var userData = dataObj.Users;

		var user = userData[username];

		if (user && user.username == username && user.password === password) {
			res.status(200).json({ success: user });
		} else {
			res.status(404).json({ error: "User not found" });
		}
	});

	// console.log(req.query)
	// var filePath = path.join(__dirname, 'LocalStorage.json');
	// console.log(filePath);

	// await fs.readFile(filePath, "utf8", (err, data) => {
	// 	if (err) throw err;
	// 	console.log("Got data",username);
	// 	var userData = JSON.parse(data).Users;
	// 	var user = userData[username];

	// 	if(user && user.username == username && user.password === password) {
	// 		res.status(200).json({success: user});
	// 	} else {
	// 		res.status(404).json({error : "User not found"});
	// 	}
	// });

});

router.post('/addUser', async function (req, res, next) {
	var username = req.body.username;

	service.getData(function (dataObj) {
		var userData = dataObj.Users;
		if (userData[username] == null) {
			userData[username] = req.body;
			dataObj.Users = userData;
			service.saveDataToStorage(JSON.stringify(dataObj), function (err, data) {
				if (err) throw err;
				console.log("User added successfull");
			});
			res.status(200).json({ success: username });
		} else {
			res.status(501).json({ success: "User already exist" });
		}
		
	});

	// await fs.readFile(filePath, "utf8", (err, data) => {
	// 	if (err) throw err;
	// 	console.log("Got data",username);
	// 	var userData = JSON.parse(data).Users;
	// 	var user = userData[username];

	// 	if(user && user.username == username && user.password === password) {
	// 		res.status(200).json({success: user});
	// 	} else {
	// 		res.status(404).json({error : "User not found"});
	// 	}
	// });

});

module.exports = router;