import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

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
  submitted = false;

  signupForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'handle': new FormControl('', Validators.required)
  });

  confirmationForm = new FormGroup({
    'code': new FormControl('', Validators.required)
  })

  onSubmit() {
    this.email = this.signupForm.value['email'];
    this.password = this.signupForm.value['password'];
    let handle = this.signupForm.value['handle'];

    Auth.signUp({
      username: this.email,
      password: this.password
    });

    this.submitted = true;
  }

  onSubmitConfirmation() {
    let confirmationCode = this.confirmationForm.value['code'];

    Auth.confirmSignUp(this.email, confirmationCode);

    try {
      Auth.signIn(this.email, this.password);
    } catch (e) {
      alert(e.message);
    }

    this.router.navigate(['']);
  }





}
