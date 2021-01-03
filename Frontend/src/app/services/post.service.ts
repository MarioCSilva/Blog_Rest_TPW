import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseURL = 'http://localhost:8000/ws/';

  constructor(private http: HttpClient) { }

  getPost(id: number): Observable<Post> {
    const url = this.baseURL + 'post?id=' + id;
    return this.http.get<Post>(url);
  }

  getPosts(id: number): Observable<Post[]> {
    const url = this.baseURL + 'posts?blog=' + id;
    return this.http.get<Post[]>(url);
  }

}
