import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';
import {Post} from '../models/Post';
import {Topic} from '../models/Topic';

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

  getPosts(): Observable<Post[]> {
    const url = this.baseURL + 'main/posts';
    return this.http.get<Post[]>(url);
  }

  getFilteredPosts(search: string, order: string, orderBy: string): Observable<Post[]> {
    const url = this.baseURL + 'main/posts?search=' + search + '&order=' + order + '&orderBy=' + orderBy;
    return this.http.get<Post[]>(url);
  }

  getFilteredBlogs(search: string, order: string, orderBy: string, topics: Topic[]): Observable<Blog[]> {
    const url = this.baseURL + 'main/blogs?search=' + search + '&order=' + order + '&orderBy=' + orderBy + '&topics=' + topics;
  }

}
