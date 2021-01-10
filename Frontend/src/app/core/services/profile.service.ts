import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';

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
    let url: string;
    console.log(name);
    if (name){
      url = this.baseURL + 'profile?name=' + name;
    }else{
      url = this.baseURL + 'profile';
    }
    return this.http.get<[Client, boolean]>(url);
  }

  updateProfile(client: Client): Observable<any> {
    // TODO: update url
    const url = this.baseURL + 'profile';
    return this.http.put(url, client, httpOptions);
  }

  updateAccount(user: User): Observable<any> {
    const url = this.baseURL + 'settings' ;
    return this.http.put(url, user, httpOptions);
  }
}
