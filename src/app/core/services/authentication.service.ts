import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {StorageService} from './storage.service';
import {BaseURL} from '../utils/base_url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = BaseURL.baseURL + 'login';
    return this.http.post<string>(
      url,
      '{"username":"' + username + '", "password": "' + password + '" }',
      httpOptions
    );
  }

  register(user: User): Observable<any> {
    const url = BaseURL.baseURL + 'register';
    return this.http.post<string>(url, user, httpOptions);
  }

  logout(): void {
    StorageService.removeAuthToken();
  }
  isAuthenticated(): boolean {
    const token = StorageService.getAuthToken();
    if (token){
      return true;
    }
    return false;
  }
}
