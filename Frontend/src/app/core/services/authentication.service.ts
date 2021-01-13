import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {StorageService} from './storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseURL = 'http://localhost:8000/ws/';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = this.baseURL + 'login';
    return this.http.post<string>(
      url,
      '{"username":"' + username + '", "password": "' + password + '" }',
      httpOptions
    );
  }

  register(user: User): Observable<any> {
    const url = this.baseURL + 'register';
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
