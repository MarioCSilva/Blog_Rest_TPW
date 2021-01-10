import {Component, Input, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';
import {ProfileService} from '../../../../core/services/profile.service';
import {ActivatedRoute} from '@angular/router';

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
  name: string;
  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updating = false;
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
      console.log(this.name);
    });
    this.profileService.getProfile(this.name).subscribe(data => {
      this.client = data['client'];
      console.log(this.client);
      this.owner = data['owner'];
      this.client.profile_pic = this.client.profile_pic == null ? '' : this.client.profile_pic  ;
      this.updateClient = this.client;
      console.log(this.updateClient);
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
