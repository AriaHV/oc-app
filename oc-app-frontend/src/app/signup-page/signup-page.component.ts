import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})

export class SignupPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

  state = {
    email: "",
    password: "",
    handle: "",
    user: null,
    confirmationCode: ""
  }

  signupForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'handle': new FormControl('', Validators.required)
  });

  confirmationForm = new FormGroup({
    'code': new FormControl('', Validators.required)
  })

  onSubmit() {
    this.state.email = this.signupForm.value['email'];
    this.state.password = this.signupForm.value['password'];
    this.state.handle = this.signupForm.value['handle'];

    this.state.user = Auth.signUp({
      username: this.state.email,
      password: this.state.password
    });
  }

  onSubmitConfirmation() {
    this.state.confirmationCode = this.confirmationForm.value['code'];

    Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
    //Auth.signIn(this.state.email, this.state.password);
  }





}
