import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {StorageService} from '../../../../core/services/storage.service';
import {NavbarComponent} from "../../../../shared/components/navbar/navbar.component";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  username: string;
  password: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    protected alertService: AlertService,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.username, this.password).subscribe(token => {
      StorageService.setAuthToken(token.token);
      this.router.navigate(['/home']);
    }, error => {
      this.alertService.error('Username and password do not match.', this.options);
    });
  }
}
