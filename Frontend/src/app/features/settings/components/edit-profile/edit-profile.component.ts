import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  client: Client;
  owner: string;
  constructor() { }

  ngOnInit(): void {
  }

}
