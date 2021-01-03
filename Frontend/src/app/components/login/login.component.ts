import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private storageService: StorageService
  ) { }

  ngOnInit(): void {
  }

  login(): void{
    this.authService.login().subscribe(token => {this.storageService.setAuthToken(token.token)});
  }
}
