import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRef = new FormGroup({
    user:new FormControl(),
    pass:new FormControl(),
    firstname:new FormControl(),
    lastname:new FormControl()
  });
  msg:string=""
    constructor(public router:Router) { } 
  ngOnInit(): void {
  }
  createUser(){
    let newUser = this.signupRef.value;

    let newUserJSON = {user: newUser.user, pass: newUser.pass};

    let userArray = JSON.parse(localStorage.getItem("userArray") || '[]');
    
    console.log(userArray);

    userArray.push(newUserJSON);

    localStorage.setItem("userArray", JSON.stringify(userArray));

    console.log(JSON.parse(localStorage.getItem("userArray") || '[]'));

    this.signupRef.reset(); 
    this.router.navigate(["login"]); 
  }
}
