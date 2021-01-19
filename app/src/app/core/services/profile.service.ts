import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Client} from '../models/Client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/User';
import {BaseURL} from '../utils/base_url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProfileService {


  constructor(private http: HttpClient) { }

  getProfile(name: string): Observable<[Client, boolean]> {
    let url: string;
    console.log(name);
    if (name){
      url = BaseURL.baseURL + 'profile?name=' + name;
    }else{
      url = BaseURL.baseURL + 'profile';
    }
    return this.http.get<[Client, boolean]>(url);
  }

  updateProfile(client: Client, profile_pic: File): Observable<any> {
    const url = BaseURL.baseURL + 'profile';
    let payload = new FormData();
    payload.append('client', JSON.stringify(client));
    if(profile_pic)
      payload.append('file', profile_pic);
    return this.http.put(url, payload);
  }

  getAccount(): Observable<any> {
    const url = BaseURL.baseURL + 'settings';
    return this.http.get<any>(url);
  }

  updateAccount(user: User): Observable<any> {
    const url = BaseURL.baseURL + 'settings' ;
    return this.http.put(url, user, httpOptions);
  }
  deleteAccount(): Observable<any> {
    const url = BaseURL.baseURL + 'settings';
    return this.http.delete(url);
  }
}
