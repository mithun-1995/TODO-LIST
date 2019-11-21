import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoListComponent } from './todo-list/todo-list.component'; 
import { LogInComponent } from './log-in/log-in.component'; 

const routes: Routes = [
  { path: '', component: LogInComponent },
  { path: 'user', component: TodoListComponent , children: [
    { path: ':id', component: TodoListComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
 
}
