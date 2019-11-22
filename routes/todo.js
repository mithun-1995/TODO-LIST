var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var fs = require('fs');
var service = require('./service')

///
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET todo listing. */
router.get('/getTodos/:userId', async function(req, res, next) {
    var userID = req.params.userId;
    service.getTodoForUSer(userID, function(dataObj) {
        res.json({ data  : dataObj})
    });
});

/* add todo listing. */
router.post('/add', async function(req, res, next) {
    var data = service.addTodo(req.body, function(dataObj){
      res.json({ data  : dataObj})
    });
});

/* delete todo listing. */
router.delete('/delete', function(req, res, next) {
    service.deleteTodo(req.body, function(dataObj){
        res.json({ data  : dataObj})
    });
});

/* delete todo listing. */
router.put('/edit', function(req, res, next) {
    service.updateTodo(req.body, function(dataObj){
        res.json({ data  : dataObj})
    });
});

module.exports = router;