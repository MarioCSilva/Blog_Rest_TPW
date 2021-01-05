import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseURL = 'http://localhost:8000/ws/';
  constructor(private http: HttpClient) { }

  getProfile(name: string): Observable<Client> {
    const url = this.baseURL + 'profile/' + name;
    return this.http.get<Client>(url);
  }
}
