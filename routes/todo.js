var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var fs = require('fs');
var service = require('./service')

///
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET customer listing. */
router.get('/add', async function(req, res, next) {
    var data = service.addTodo(req.body);
    console.log("R",req.body)
    res.json({ data  : "res.body"})
});

module.exports = router;