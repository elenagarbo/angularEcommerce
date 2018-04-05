import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


import { FormsModule }   from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


import { AuthService } from '../auth-service-guard/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any;
  password:any;
  constructor(private http: HttpClient, private router: Router,  
    private authService: AuthService) { 
     }

  ngOnInit() {
  }
  loginGoogle() {
    this.authService.googleLogin();
  }
  loginTwitter() {
    this.authService.twitterLogin();
  }
 login(){
  this.authService.login(this.email, this.password);
}

  onClickLogout() {
    this.authService.logout();
  }
 
 
}
