import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRef = new FormGroup({
    user:new FormControl(),
    pass:new FormControl()
  });
  msg:string=""
    constructor(public router:Router) { } 
  ngOnInit(): void {
  }
  checkUser(){
    let userArray = JSON.parse(localStorage.getItem("userArray") || '[]');
    let login = this.loginRef.value;

    for (let i = 0; i < userArray.length; i++) {
      if (userArray[i].user == login.user) {
        if (userArray[i].pass == login.pass) {
          this.router.navigate(["portfolio",login.user]); 
        }
      }
    }
    this.msg  = "Invalid username or password";
    this.loginRef.reset();   
  }
}