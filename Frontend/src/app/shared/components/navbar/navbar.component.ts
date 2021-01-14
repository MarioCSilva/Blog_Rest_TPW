import {Component, HostListener, OnInit} from '@angular/core';
import {StorageService} from "../../../core/services/storage.service";
import {RoleGuardService} from "../../../core/guards/role-guard.service";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {ActivatedRoute, NavigationStart, Params, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn: boolean = this.authService.isAuthenticated();

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    router.events.subscribe(
(e) => {
        if (e instanceof NavigationStart) {
          this.loggedIn = this.authService.isAuthenticated();
        }
      });
  }

  ngOnInit() { }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    let element = document.querySelector('.navbar');
    console.log(element)
    if (window.pageYOffset > element.clientHeight) {
      element.classList.remove('navbar-normal');
      element.classList.add('navbar-inverse');
    } else {
      element.classList.remove('navbar-inverse');
      element.classList.add('navbar-normal');
    }
  }

  logout() {
    StorageService.removeAuthToken();
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
