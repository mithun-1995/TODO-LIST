import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODO-LIST-APP';
  userObject:any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {

	}

  /*
     this function will check for user login
  */
  todoLogin(){
    console.log("User Details: ",this.userObject);

      var params = {
        params: this.userObject
      }
      this.http.get('/api/v1/', params).subscribe((data:any) => {
         console.log(data);
      });    
  }
}
