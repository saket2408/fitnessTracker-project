import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
 user : any
  _url: any
  constructor(private router : Router) { }

  ngOnInit() {
    this._url = `http://localhost:8010/search`
    fetch(this._url,{
        method : "POST",
        headers: {
            "content-type": "application/json"
           },
        body : JSON.stringify({
            email :sessionStorage.getItem("email")
        })
    })
    .then(res=>res.json())
    .then(data=>{
     this.user = data
  })
  this.openModal.nativeElement.click();
  }

  signout(){
    sessionStorage.removeItem("email");
    this.router.navigate(['login']);

  }
}
