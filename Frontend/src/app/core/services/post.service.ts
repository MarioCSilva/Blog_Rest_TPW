import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Post} from '../models/Post';
import {Blog} from "../models/Blog";
import {BaseURL} from '../utils/base_url';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getPost(id: number): Observable<Post> {
    const url = BaseURL.baseURL + 'post?id=' + id;
    return this.http.get<Post>(url);
  }

  likePost(id: number): Observable<any> {
    const url = BaseURL.baseURL + 'like_post';
    console.log(id);
    return this.http.post(url, {'post': id}, httpOptions);
  }

  createPost(title: string, text: string, blog: Blog, pic_file: File): Observable<any> {
    let data = {
      'title': title,
      'text': text,
    }
    if (blog != null) {
      data['blog'] = blog.id;
    }
    const payload = new FormData();
    payload.append('data', JSON.stringify(data));
    payload.append('file', pic_file);
    const url = BaseURL.baseURL + 'new_post';
    return this.http.post<Post[]>(url, payload);
  }
}
