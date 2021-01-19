import { Injectable } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  static loggedIn: boolean = false;

  constructor(private authService: AuthenticationService , private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;

    let loggedIn = this.authService.isAuthenticated();

    if (loggedIn && expectedRole !== 'Authenticated') {
      this.router.navigate(['/home/posts']);
      return false;
    }
    if (!loggedIn && expectedRole !== 'Not Authenticated'){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
