import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';
import {Post} from '../models/Post';
import {BaseURL} from '../utils/base_url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class MainPageService {

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    const url = BaseURL.baseURL + 'main/blog';
    return this.http.get<Blog[]>(url);
  }

  getPosts(): Observable<Post[]> {
    const url = BaseURL.baseURL + 'main/posts';
    return this.http.get<Post[]>(url);
  }

  getFilteredPosts(search: string, order: string, orderBy: string): Observable<Post[]> {
    const url = BaseURL.baseURL + 'main/posts?search=' + search + '&order=' + order + '&orderBy=' + orderBy;
    return this.http.get<Post[]>(url);
  }

  getFilteredBlogs(search: string, order: string, orderBy: string, topics: number[]): Observable<Blog[]> {
    let url = BaseURL.baseURL + 'main/blog?search=' + search + '&order=' + order + '&orderBy=' + orderBy + '&topics=';
    console.log(topics);
    if (topics.length !== 0){
      url += topics;
    }
    return this.http.get<Blog[]>(url);
  }

}
