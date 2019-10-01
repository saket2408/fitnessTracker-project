import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('openModal',undefined) openModal:ElementRef;
  @ViewChild('close',undefined) close:ElementRef;
  registerForm: FormGroup;
  submitted = false;
  _url : any
  error:any
  mobileNumber:any
  constructor(private formBuilder: FormBuilder,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      gender : ['male'],
      age : [''],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [''],
      height: [''],
      weight: ['']
    }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
}

// convenience getter for easy access to form fields
get f() { return this.registerForm.controls; }

onSubmit() {
 
  
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }
  
  this._url = `http://localhost:8010/users`
 
  fetch(this._url,{
    method : "POST",
    headers: {
        "content-type": "application/json"
       },
    body : JSON.stringify({
       firstName : this.registerForm.value.firstName,
       lastName : this.registerForm.value.lastName,
       email : this.registerForm.value.email,
       password : this.registerForm.value.password,
       age : this.registerForm.value.age,
       gender : this.registerForm.value.gender,
       height : this.registerForm.value.height,
       weight : this.registerForm.value.weight
    })
})
.then(res=>res.json())
.then(data=>{
  if(data.message!=null){
    this.error = data.message;
    this.router.navigate(['signup']);
  }
  else{
    this.openModal.nativeElement.click();
  }
})
}

sendmsg(mobileNumber)
{
  
  this._url = `http://localhost:8001/sendMsg`
  fetch(this._url,{
    method : "POST",
    headers: {
        "content-type": "application/json"
       },
    body : JSON.stringify({
       phoneNo : mobileNumber.mobile
    })
})
.then(res=>res.json())
.then(data=>{
    this.close.nativeElement.click();
    console.log(data)
    if(data.message!= null){
      console.log("sjd")
      var encr = CryptoJS.AES.encrypt(this.registerForm.value.email,"randomPassphrase");
    localStorage.setItem("token" , encr.toString());
    this.router.navigate(['home']);
    
    }
   
  })
}


MustMatch(controlName: string, matchingControlName: string) {
return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
    } else {
        matchingControl.setErrors(null);
    }
}
  }

}


