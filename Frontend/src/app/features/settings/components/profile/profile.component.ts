import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';
import {ProfileService} from '../../../../core/services/profile.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  client: Client;
  owner: boolean;
  updating: boolean;
  updateClient: Client;
  name: string;
  constructor(private profileService: ProfileService,
              private route: ActivatedRoute,
              protected alertService: AlertService) { }

  ngOnInit(): void {
    this.updating = false;
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });

    this.profileService.getProfile(this.name).subscribe(data => {
      this.client = data['client'];
      this.owner = data['owner'];
      this.client.profile_pic = this.client.profile_pic == null ? '' : this.client.profile_pic  ;
      this.updateClient = this.client;
    });
  }

  updateProfile(): void {
    // TODO: change date format to work with the rest
    this.profileService.updateProfile(this.updateClient).subscribe(data => {
        this.client = this.updateClient;
        this.alertService.success("Successfully updated your account.", this.options);
      },
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      });
  }

  discardChanges(): void{
    this.updateClient = this.client;
    this.ngOnInit();
  }

}
