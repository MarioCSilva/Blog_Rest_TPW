import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Comment} from '../models/Comment';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseURL = 'http://localhost:8000/ws/';

  constructor(private http: HttpClient) { }

  postComment(comment: Comment): Observable<any> {
    const url = this.baseURL + 'post_comment/';
    return  this.http.post(url, comment, httpOptions);
  }
  getComments(post: number): Observable<Comment> {
    // TODO: Check api endpoint
    const url = this.baseURL + 'comment';
    return this.http.get<Comment>(url);
  }
}
