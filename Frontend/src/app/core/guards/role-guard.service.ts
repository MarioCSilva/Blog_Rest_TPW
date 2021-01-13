import { Injectable } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(private authService: AuthenticationService , private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.role;
    console.log(route.data.role);
    console.log(this.authService.isAuthenticated());

    if (this.authService.isAuthenticated() && expectedRole !== 'Authenticated') {
      this.router.navigate(['/home/posts']);
      return false;
    }
    if (!this.authService.isAuthenticated() && expectedRole !== 'Not Authenticated'){
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
