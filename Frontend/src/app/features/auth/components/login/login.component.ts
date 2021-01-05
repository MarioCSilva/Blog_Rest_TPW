import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {StorageService} from '../../../../core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username;
  public password;
  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  login(): void{
    this.authService.login(this.username, this.password).subscribe(token => {StorageService.setAuthToken(token.token); });
  }
}
