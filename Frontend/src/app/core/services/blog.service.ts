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

  getBlog(blog_id?: number): Observable<Blog> {
    let url = this.baseURL + 'blog';
    if (blog_id!=null) {
      url += '?id=' + blog_id;
    }
    return this.http.get<Blog>(url);
  }
  
  updateBlogName(blog): Observable<Blog> {
    let data = {
      'name': blog.name,
      'description': blog.description,
      'isPublic': blog.isPublic,
    }
    const url = this.baseURL + 'blog?id=' + blog.id;
    return this.http.put<Blog>(url, data);
  }
}
