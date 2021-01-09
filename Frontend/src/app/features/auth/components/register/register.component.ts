import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {User} from '../../../../core/models/User';
import {StorageService} from '../../../../core/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  email: string;
  cpassword: string;

  constructor(private authservice: AuthenticationService) { }

  ngOnInit(): void {
  }

  register(): void{
    const user: User = {
      username: this.username,
      password: this.password,
      password2: this.cpassword,
      email: this.email
    };
    this.authservice.register(user).subscribe(token => {StorageService.setAuthToken(token.token); });
  }

}
