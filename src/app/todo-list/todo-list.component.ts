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
    this.route.params.subscribe(params => {
      console.log(params['user']); // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });
   }

  userId:any;
  ngOnInit() {
    //get todo list for specific user
    this.userId = this.route.snapshot.params['userid']
    console.log(this.userId)

  }

}
