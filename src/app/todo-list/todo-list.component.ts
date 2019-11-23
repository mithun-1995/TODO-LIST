import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    
   }

  userId:any;
  todoList:any;
  toggleObj:any;
    ngOnInit() {
      this.toggleObj = {};
      //get todo list for specific user
      this.userId = this.route.snapshot.params.userid;
      console.log(this.userId)
      this.http.get('/api/v1/todos/getTodos/'+this.userId).subscribe(
      (result:any) => {
        console.log(result.data);
        this.todoList = result.data;
      },
      err => {
        console.log('Something went wrong!',err.error);
      }
  ); 
  }

  objectKeys(obj) {
    return Object.keys(obj);
}

}
