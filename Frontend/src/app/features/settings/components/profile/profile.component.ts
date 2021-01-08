import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';
import {ProfileService} from '../../../../core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  client: Client;
  owner: boolean;
  updating: boolean;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.updating = false;
    this.profileService.getProfile('olasounovoaqui40').subscribe(data => {
      console.log(data);
      this.client = data['client'];
      this.owner = data['owner'];
      this.client.profile_pic = this.client.profile_pic == null ? '' : this.client.profile_pic  ;
    });
  }

  updateProfile(): void {
    console.log('updating profile');
  }

}
