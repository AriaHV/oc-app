import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Auth } from 'aws-amplify';
import { AmplifyService } from 'aws-amplify-angular';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  loginForm = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
  });

  onSubmit() {
    let email = this.loginForm.value['email'];
    let password = this.loginForm.value['password'];

    try {
      Auth.signIn(email, password);
    } catch (e) {
      alert(e.message);
    }
    
  }

}
