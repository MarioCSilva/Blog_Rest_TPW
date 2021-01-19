import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../../core/services/profile.service';
import {User} from '../../../../core/models/User';
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-settings-card',
  templateUrl: './settings-card.component.html',
  styleUrls: ['./settings-card.component.css']
})
export class SettingsCardComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  user: User;
  constructor(private profileService: ProfileService,protected alertService: AlertService) { }

  ngOnInit(): void {
    this.user = {username: '', email: '', password: '', password2: ''};
    this.profileService.getAccount().subscribe(data => {
        this.user.email = data['user'].email;
        this.user.username = data['user'].username;
    }, error => {
      this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
    } );
  }

  updateAccount(): void{
    this.profileService.updateAccount(this.user).subscribe(data => {
        this.alertService.success("Successfully updated your account settings.", this.options);
      }
      , error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
    });
  }

}
