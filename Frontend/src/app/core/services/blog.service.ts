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

  getBlog(blog_id): Observable<Blog> {
    const url = this.baseURL + 'blog/' + blog_id;
    return this.http.get<Blog>(url);
  }

  updateBlogName(blog_id, name, description): Observable<Blog> {
    let data = {
      name: name,
      description: description,
    }
    const url = this.baseURL + 'blog/' + blog_id;
    return this.http.put<Blog>(url, data);
  }
}
