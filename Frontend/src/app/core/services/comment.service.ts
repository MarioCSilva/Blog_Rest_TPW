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

  postComment(post: number, text: string): Observable<any> {
    const url = this.baseURL + 'post_comment';
    return  this.http.post(url, {post, text}, httpOptions);
  }
}
