import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../../core/services/profile.service';
import {User} from '../../../../core/models/User';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.css']
})
export class SettingsCardComponent implements OnInit {

  user: User;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    // TODO: handle errors
    this.user = {username: '', email: '', password: '', password2: ''};
    this.profileService.getAccount().subscribe(data => {
        this.user.email = data.user.email;
        this.user.username = data.user.username;
    } );
  }
  updateAccount(): void{
    // TODO: handle errors
    this.profileService.updateAccount(this.user).subscribe(data => console.log(data));
  }

}
