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
  @Input()
  client: Client;
  @Input()
  owner: boolean;
  pic_file: File;
  updating: boolean;
  updateClient: Client;

  constructor(private profileService: ProfileService,
              protected alertService: AlertService) { }

  ngOnInit(): void {
    this.updating = false;
    this.updateClient = this.client;
  }

  updateProfile(): void {

    this.profileService.updateProfile(this.updateClient, this.pic_file).subscribe(data => {
        this.client = this.updateClient;
        this.alertService.success('Successfully updated your account.', this.options);
      },
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      });
  }

  discardChanges(): void{
    this.updateClient = this.client;
    this.ngOnInit();
  }

  file(event){
    const files = event.target.files;
    this.pic_file = files[0];
  }

}
