var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'LocalStorage.json');

var getDataFromStorage = function (callback) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) throw err;
    var data = JSON.parse(data);
    callback(data);
  })
};

var getToDosForUser = function(userId, callback) {
  getDataFromStorage(function(data){
    var todos = data.ToDoList[userId]
    if(todos) {
      callback(todos);
    } else {
      todos = {}
    }
  })
}

var saveData = function(stringObj){
  fs.writeFile(filePath, stringObj, 'utf8', function(err, data) {
    if (err) throw err;
    console.log("Updated file successfull");
  });
};

var deleteTodoWithId = function(reqBody, callback) {
  console.log(reqBody)
  var userID = reqBody.userID;
  var todoID = reqBody.key;
  getDataFromStorage(function(data){
     if(data.ToDoList[userID] && data.ToDoList[userID][todoID]) {
       delete data.ToDoList[userID][todoID];
       console.log("Todo with id "+todoID+" deleted succesfully");
       //storing to file
        saveData(JSON.stringify(data), function(err, data) {
          if (err) throw err;
          console.log("Todo added successfull");
          var todoObj = {todoId : id}
          return id;
        });
       callback(todoID);
     } else {
       throw "Failed to delete todo";
     }
  });
}

var updateTodoWithId = function(reqBody, callback){
  var userID = reqBody.userID;
  var todoID = reqBody.key;
  var updateData = reqBody.data;
  getDataFromStorage(function(data){
    if(data.ToDoList[userID] && data.ToDoList[userID][todoID]) {
      data.ToDoList[userID][todoID] = updateData;
      console.log("Todo with id "+todoID+" updated succesfully");
      var stringObj = JSON.stringify(data);
      saveData(stringObj)
      callback(updateData);
    } else {
      throw "Failed to delete todo";
    }
  });
};


var addTodoToUserList = function (reqBody, callback) {
  var id = getTodoUUID();
  var userId = reqBody.userID;
  var newToDoObject = reqBody.data;
  getDataFromStorage(function (storage) {
    var todoList = storage.ToDoList;

    //check is todolist is already exist for user
    if (!todoList[userId]) {
      todoList[userId] = {};
    }

    todoList[userId][id] = newToDoObject;

    storage.ToDoList = todoList;
    var stringObj = JSON.stringify(storage);

    //storing to file
    saveData(stringObj, function(err, data) {
      if (err) throw err;
      console.log("Todo added successfull");
      var todoObj = {todoId : id}
      return id;
    });

    callback(todoList[userId]);
  });
}

function getTodoUUID(){
    return 'xxxxxxxx-xxxx-4xxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

module.exports = {
  getTodoForUSer: getToDosForUser,

  addTodo: addTodoToUserList,

  deleteTodo : deleteTodoWithId,

  updateTodo : updateTodoWithId
}
