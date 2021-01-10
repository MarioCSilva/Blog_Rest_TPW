import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../../core/services/profile.service';
import {User} from '../../../../core/models/User';

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.css']
})
export class SettingsCardComponent implements OnInit {

  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
  }
  updateAccount(): void{
    const user: User = {
      username: 'olasounovoaqui41',
      email: 'randomquery@gmail.com',
      password: 'randomquerty',
      password2: 'randomquerty',
    };
    this.profileService.updateAccount(user).subscribe(data => console.log('updating account'));
  }

}
