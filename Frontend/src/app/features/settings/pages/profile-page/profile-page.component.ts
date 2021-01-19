import {Component, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';
import {ProfileService} from '../../../../core/services/profile.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../_alert';
import {Blog} from '../../../../core/models/Blog';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  client: Client;
  name: string;
  owner: boolean;
  blogs: Blog[];
  constructor(private profileService: ProfileService, protected alertService: AlertService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });

    this.profileService.getProfile(this.name).subscribe(data => {
      this.client = data['client'];
      this.owner = data['owner'];
      this.blogs = data['subscriptions']
      console.log(this.client);
      if (this.client.name === ''){
        this.client.name = this.client.user.username;
      }
      this.client.profile_pic = this.client.profile_pic == null ? '' : this.client.profile_pic  ;
    });
  }

}
