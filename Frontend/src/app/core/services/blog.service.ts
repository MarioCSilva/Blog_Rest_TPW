import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseURL = 'http://localhost:8000/ws/';

  constructor(private http: HttpClient) { }

  getMyBlog(): Observable<Blog> {
    const url = this.baseURL + 'my_blog/';
    return this.http.get<Blog>(url);
  }
}
