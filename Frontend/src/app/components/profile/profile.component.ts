import { Component, OnInit } from '@angular/core';
import {Client} from '../../model/Client';

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
  }

}
