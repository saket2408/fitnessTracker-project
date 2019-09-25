import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
            email :localStorage.getItem("email")
        })
    })
    .then(res=>res.json())
    .then(data=>{
      this.user = data
    })
  }

  signout(){
    localStorage.removeItem("email");
    this.router.navigate(['login']);

  }
}
