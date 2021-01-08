import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  private baseURL = 'http://localhost:8000/ws/';
  constructor(private http: HttpClient) { }

  getProfile(name: string): Observable<[Client, boolean]> {
    const url = this.baseURL + 'profile/' + name;
    return this.http.get<[Client, boolean]>(url);
  }

  updateProfile(client: Client): Observable<any> {
    // TODO: update url
    const url = this.baseURL + 'update/';
    return this.http.put(url, client, httpOptions);
  }
}
