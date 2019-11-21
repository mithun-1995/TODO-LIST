var fs = require('fs');
var path = require('path');
var filePath = path.join(__dirname, 'LocalStorage.json');

module.exports = { 
    getData : function(callback) {
      fs.readFile(filePath, "utf8", (err, data) => {
            if (err) throw err;
            return data;
      })
    },

    addTodo : function(newToDoObject) {
      var id =  "454546444444662"
      fs.readFile(filePath, "utf8", (err, data) => {
            if (err) throw err;
            if(data){
               var storage = JSON.parse(data);
               var todoList = storage.ToDoList;
               var userId = newToDoObject.userID;
               //check is todolist is already exist for user
               if(!todoList[userId]){
                todoList[userId] = {};
               }
              //if exist
              todoList[userId][id] = newToDoObject;
       
               storage.ToDoList = todoList;
               console.log(storage)
               var stringObj = JSON.stringify(storage)
               fs.writeFile(filePath, stringObj, 'utf8',function(err, data){
                if (err) throw err;
                console.log("Write file successfull");
                return data;
               })
            }
      })
    }
}
