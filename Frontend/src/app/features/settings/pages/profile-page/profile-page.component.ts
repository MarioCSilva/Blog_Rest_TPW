import {Component, HostListener, OnInit} from '@angular/core';
import {Client} from '../../../../core/models/Client';
import {ProfileService} from '../../../../core/services/profile.service';
import {ActivatedRoute} from '@angular/router';
import {AlertService} from '../../../../_alert';
import {Blog} from '../../../../core/models/Blog';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  client: Client;
  name: string;
  owner: boolean;
  blogs: Blog[];

  cols: number = 3;
  pageIndex:number = 0;
  pageSize:number = 6;
  lowValue:number = 0;
  highValue:number = 6;
  cur_page: number = 0;
  flag_2: boolean = false;
  flag_3: boolean = true;

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(private profileService: ProfileService, protected alertService: AlertService,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
    this.profileService.getProfile(this.name).subscribe(data => {
      this.client = data['client'];
      this.owner = data['owner'];
      this.blogs = data['subscriptions']
      if (this.client.name === ''){
        this.client.name = this.client.user.username;
      }
      this.client.profile_pic = this.client.profile_pic == null ? '' : this.client.profile_pic  ;
    });
    if (window.innerWidth <= 1000) {
      this.cols = 1;
      this.pageSize = 4;
      this.highValue = 4;
    } else if (window.innerWidth <= 1700) {
      this.cols = 2;
      this.pageSize = 4;
      this.highValue = 4;
    } else {
      this.cols = 3;
      this.pageSize = 6;
      this.highValue = 6;
    }
  }


  getPaginatorData(event){
    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
    return event;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 1140) {
      this.cols = 1;
    } else if (window.innerWidth <= 1700) {
      this.cols = 2;
    }
    if (window.innerWidth <= 1700) {
      this.pageSize = 4;

      if (this.flag_2 == true){
        this.flag_2 = false;
      }
      this.lowValue = this.pageIndex * 4;
      this.highValue = this.pageIndex * 4 + 4;
    } else {
      this.cols = 3;
      this.pageSize = 6;

      if (this.flag_3 == true) {
        this.flag_3 = false;
      }
      this.lowValue = this.pageIndex * 6;
      this.highValue = this.pageIndex * 6 + 6;
    }
  }

}
