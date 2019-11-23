import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  userObject:any = {};
  constructor(private http: HttpClient,
              private route: ActivatedRoute, 
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

      /*
      this function will check for user login
    */
 todoLogin(){
  console.log("User Details: ",this.userObject);

    var params = {
      params: this.userObject
    }
    this.http.get('/api/v1/', params).subscribe(
         // Successful responses call the first callback.
        (data:any) => {
          console.log(data)
          var userid = data.success.username;
          console.log(userid)
          this.router.navigate(['/user/'+userid])
        },
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!',err.error);
          var message = "User with "+this.userObject.username+" not found";
          var action = "Dismiss";
          this.openSnackBar(message ,action);
        }
    ); 
}

openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 2000,
  });
}

}

