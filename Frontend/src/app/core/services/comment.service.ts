import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BaseURL} from '../utils/base_url';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  postComment(post: number, text: string): Observable<any> {
    const url = BaseURL.baseURL + 'post_comment';
    return  this.http.post(url, {post, text}, httpOptions);
  }
}
