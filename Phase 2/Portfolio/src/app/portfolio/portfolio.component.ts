import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  user?:string=""

  myContacts: Array<any> = [];

  constructor(public activeRoute:ActivatedRoute,public router:Router) { 
    this.activeRoute.params.subscribe(data=>this.user=data.username);
  } 

  newContact = new FormGroup({
    contactName:new FormControl(),
    contactNumber:new FormControl()
  });

  ngOnInit(): void {
  }

  addContact() {
    let contact = this.newContact.value;
    let newContactJSON = {contactName: contact.contactName, contactNumber: contact.contactNumber};

    let contactArray = JSON.parse(localStorage.getItem("contactArray") || '[]');

    console.log(contactArray);

    contactArray.push(newContactJSON);

    localStorage.setItem("contactArray", JSON.stringify(contactArray));

    console.log(JSON.parse(localStorage.getItem("contactArray") || '[]'));

    this.myContacts.push(newContactJSON);

    console.log(this.myContacts);

    this.newContact.reset(); 

  }

  logout(){
    this.router.navigate(["login"]);
  }

}
