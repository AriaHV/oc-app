import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Auth, API } from 'aws-amplify';
import { Router } from '@angular/router';
import defaults from '../defaults';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})

export class SignupPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  email: string;
  password: string;
  handle: string;
  submitted = false;

  signupForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'handle': new FormControl('', Validators.required)
  });

  confirmationForm = new FormGroup({
    'code': new FormControl('', Validators.required)
  })

  async onSubmit() {
    this.email = this.signupForm.value['email'];
    this.password = this.signupForm.value['password'];
    this.handle = this.signupForm.value['handle'];

    Auth.signUp({
      username: this.email,
      password: this.password
    });

    this.submitted = true;
  }

  async onSubmitConfirmation() {
    let confirmationCode = this.confirmationForm.value['code'];

    await Auth.confirmSignUp(this.email, confirmationCode);

    try {
      await Auth.signIn(this.email, this.password);
    } catch (e) {
      alert(e.message);
    }

    try {
      await this.createProfile({
        "handle": this.handle,
        "displayName": this.handle,
        "bio": defaults.profiles.BIO,
        "profilePicture": defaults.profiles.PROFILE_PICTURE
      }).then(result => {
        console.log(result);
      });
    } catch (e) {
      alert(e);
    }

    this.router.navigate(['']);
  }

  createHandle(handle) {
    return API.post("handles","/handles", {
      body: handle
    });    
  }

  createProfile(profile) {
    return API.post("profiles","/profiles", {
      body: profile
    });
  }





}
