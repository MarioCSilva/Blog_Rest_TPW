import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Topic} from "../models/Topic";


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

  updateBlog(blog): Observable<Blog> {
    let topics: number[] = [];

    for(let i=0; i<blog.topic.length; i++){
      topics.push(blog.topic[i]['id']);
    }
    let data = {
      'name': blog.name,
      'description': blog.description,
      'isPublic': blog.isPublic,
      'topic': topics,
    }
    const url = this.baseURL + 'blog?id=' + blog.id;
    return this.http.put<Blog>(url, data);
  }

  getTopics(): Observable<Topic[]> {
    const url = this.baseURL + 'topics';
    return this.http.get<Topic[]>(url);
  }

  blog_follow(blog_id): Observable<any> {
    const url = this.baseURL + 'blog_follow';
    return this.http.post<any>(url, {'blog': blog_id});
  }

}
