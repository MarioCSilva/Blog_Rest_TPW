import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseURL = 'http://localhost:8000/ws/';

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    const url = this.baseURL + 'login';
    return this.http.post<string>(
      url,
      '{"username":"olasounovoaqui40", "password": "randomquerty"}',
      httpOptions
    );
  }

}
