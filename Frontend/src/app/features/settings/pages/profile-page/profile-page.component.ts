import {Component, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  client: Client;

  constructor() { }

  ngOnInit(): void {
  }

}
