import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {User} from '../../../../core/models/User';
import {StorageService} from '../../../../core/services/storage.service';
import {AlertService} from "../../../../_alert";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  username: string;
  password: string;
  email: string;
  cpassword: string;

  constructor(
    private authservice: AuthenticationService,
    protected alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  register(): void{
    const user: User = {
      username: this.username,
      password: this.password,
      password2: this.cpassword,
      email: this.email
    };

    if (this.username && this.password && this.cpassword && this.email) {
      this.authservice.register(user).subscribe(token => {
        StorageService.setAuthToken(token.token);
        this.router.navigate(['/home']);
      },error => {
          this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
        });
    } else{
      this.alertService.warn("Must fill all form's inputs.", this.options);
    }
  }

}
