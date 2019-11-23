import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  reqObj: any;
  isEdit:any = false;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar) {

  }

  userId: any;
  todoList: any;
  toggleObj: any;
  showAddToDoPanel: any;
  newToDoObj: any;
  req:any;

  ngOnInit() {
    this.toggleObj = {};
    this.showAddToDoPanel = false;
    //get todo list for specific user
    this.userId = this.route.snapshot.params.userid;
    this.newToDoObj = {
      data: {}
    };
    console.log(this.userId)
    this.http.get('/api/v1/todos/getTodos/' + this.userId).subscribe(
      (result: any) => {
        console.log(result.data);
        this.todoList = result.data;
      },
      err => {
        console.log('Something went wrong!', err.error);
      }
    );
  }

  addTotdoToList() {
    this.newToDoObj.userID = this.userId;
    console.log(this.newToDoObj);
    this.http.post('/api/v1/todos/add', this.newToDoObj).subscribe(
      // Successful responses call the first callback.
      (result: any) => {
        console.log(result.data);
        this.todoList = result.data;
        var message = "TODo added successfully....!!!";
        var action = "Cool";
        this.showAddToDoPanel = false;
        this.openSnackBar(message, action);
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!', err.error);
        var message = "Something went wrong";
        var action = "Dismiss";
        this.openSnackBar(message, action);
      }
    );
  }

  todoPreview(payload) {
    payload = JSON.parse(JSON.stringify(payload))
    this.reqObj = {};
    this.reqObj.key = payload.key;
    this.reqObj.userID = this.userId;
    this.reqObj.data = payload.value;
    this.newToDoObj = this.reqObj;
    console.log(this.reqObj);
    this.showAddToDoPanel = true;
  }

  updateToDo() {
    console.log("Updating todo with :",this.reqObj)
    this.http.put('/api/v1/todos/edit', this.reqObj).subscribe(
      // Successful responses call the first callback.
      (result: any) => {
        console.log(result);
        this.todoList[this.reqObj.key] = result.data;
        var message = "Updated TODO successfully....!!!";
        var action = "Cool";
        this.showAddToDoPanel = false;
        this.openSnackBar(message, action);
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!', err.error);
        var message = "Something went wrong";
        var action = "Dismiss";
        this.openSnackBar(message, action);
      }
    );
  }

  deleteToDo(key) {
    var req = {
     params : {
      userID : this.userId,
      key : key 
     }
    }
    console.log("Deleting todo with :",req)
    this.http.delete('/api/v1/todos/delete', req).subscribe(
      // Successful responses call the first callback.
      (result: any) => {
        console.log(result.data);
        delete this.todoList[result.data];
        var message = "Deleted TODO successfully....!!!";
        var action = "Cool";
        this.showAddToDoPanel = false;
        this.openSnackBar(message, action);
      },
      // Errors will call this callback instead:
      err => {
        console.log('Something went wrong!', err.error);
        var message = "Something went wrong";
        var action = "Dismiss";
        this.openSnackBar(message, action);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
