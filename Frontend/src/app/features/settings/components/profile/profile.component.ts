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
  updateClient: Client;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.updating = false;
    this.profileService.getProfile('olasounovoaqui40').subscribe(data => {
      this.client = data['client'];
      this.owner = data['owner'];
      this.client.profile_pic = this.client.profile_pic == null ? '' : this.client.profile_pic  ;
      this.updateClient = this.client;
    });
  }

  updateProfile(): void {
    // TODO: change the error message
    // TODO: change date format to work with the rest
    this.profileService.updateProfile(this.updateClient).subscribe(data => {console.log('working'); this.client = this.updateClient; },
        error => {console.log(error); });
  }

  discardChanges(): void{
    this.updateClient = this.client;
    this.ngOnInit();
  }

}
