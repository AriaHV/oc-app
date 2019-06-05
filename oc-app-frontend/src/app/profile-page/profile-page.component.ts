import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { API } from "aws-amplify";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profile: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getProfile(params.get('handle'));
    });
  }

  async getProfile(handle: string) {
    let handleObject: any;

    await API.get('handles', '/handles/' + handle, {headers: {}})
    .then(result => {
      handleObject = result;
    });

    await API.get('profiles', '/profiles/' + handleObject.userId, {headers: {}})
    .then(result => {
      this.profile = result;
    });
  }

  


}
