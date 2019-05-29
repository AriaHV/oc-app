import { Component } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'oc-app-frontend';

  signedIn: boolean;
  user: any;

  constructor (private amplifyService: AmplifyService, private router: Router) {
    this.amplifyService.authStateChange$
    .subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
        this.router.navigate(['']);
      }
    });
  }

  onSignOut() {
    Auth.signOut();
  }
}
