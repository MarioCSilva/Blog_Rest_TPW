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
export class MainPageService {

  private baseURL = 'http://localhost:8000/ws/';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    const url = this.baseURL + 'main/blog';
    return this.http.get<Blog[]>(url);
  }


}
