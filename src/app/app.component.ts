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

}
