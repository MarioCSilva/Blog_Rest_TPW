import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../../../core/services/authentication.service';
import {StorageService} from '../../../../core/services/storage.service';
import {NavbarComponent} from '../../../../shared/components/navbar/navbar.component';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../../_alert';

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

  username = '';
  password = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    protected alertService: AlertService,
  ) { }

  ngOnInit(): void {
  }


  login(): void {
    if (this.username !== '' || this.password !== '') {
      this.authService.login(this.username, this.password).subscribe(token => {
        StorageService.setAuthToken(token.token);
        this.router.navigate(['/home']);
      }, error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      });
    } else {
      this.alertService.error('Must fill all form parameters.', this.options);
    }
  }
}
