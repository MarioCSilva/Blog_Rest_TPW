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
    this.owner = true;
    this.updating = false;
    this.client = {
      id: 1,
      name: 'test',
      description: 'test',
      birthdate: new Date(2020, 11, 31),
      sex: 'Male',
      user: {
        id: 1,
        username: 'Test User',
        email: 'test@email.com',
        password: 'randomquerty'
      },
      profile_pic: null
    };

    this.profileService.getProfile('olasounovoaqui40').subscribe(data => {
      console.log(data);
      this.client = data['client'];
      this.owner = data['owner'];
    });
  }

  updateProfile(): void {
    console.log('updating profile');
  }

}
