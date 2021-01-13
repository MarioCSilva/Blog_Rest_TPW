import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {ProfileService} from '../../../../core/services/profile.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  constructor(private authService: AuthenticationService, private profileService: ProfileService, private router: Router) { }

  ngOnInit(): void {
  }

  deleteAccount(): void{
    // TODO: test this
    this.profileService.deleteAccount().subscribe(data => {
      this.router.navigate(['/login']);
      this.authService.logout();
    });
  }
}
