import { Component, OnInit } from '@angular/core';
import {Client} from '../../core/models/Client';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  client: Client;
  owner: boolean;
  constructor() { }

  ngOnInit(): void {
    this.owner = true;
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
  }

}
