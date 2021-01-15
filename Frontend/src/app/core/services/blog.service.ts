import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Topic} from "../models/Topic";
import {Client} from "../models/Client";


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

  updateBlog(blog, owners?: string[]): Observable<Blog> {
    let topics: number[];
    let final_invites: number[];
    let final_subs: number[];

    [topics, final_invites, final_subs] = this.handleData(blog)

    if (owners == undefined) {
      owners = [];
      for(let i=0; i < blog.owner.length; i++){
        owners.push(blog.owner[i].user.username);
      }
    }

    let data = {
      'name': blog.name,
      'description': blog.description,
      'isPublic': blog.isPublic,
      'topic': topics,
      'owner': owners,
      'accepted_invites': final_invites,
      'subs': final_subs,
    }
    const url = this.baseURL + 'blog?id=' + blog.id;
    return this.http.put<Blog>(url, data);
  }

  handleData(blog) {
    let topics: number[] = [];
    let final_invites: number[] = [];
    let final_subs: number[] = [];

    for(let i=0; i<blog.invites.length; i++){
      final_invites.push(blog.invites[i]['id']);
    }

    for(let i=0; i<blog.subs.length; i++){
      final_subs.push(blog.subs[i]['id']);
    }

    for(let i=0; i<blog.topic.length; i++){
      topics.push(blog.topic[i]['id']);
    }

    return [topics, final_invites, final_subs]
  }

  getTopics(): Observable<Topic[]> {
    const url = this.baseURL + 'topics';
    return this.http.get<Topic[]>(url);
  }

  blog_follow(blog_id): Observable<any> {
    const url = this.baseURL + 'blog_follow';
    return this.http.post<any>(url, {'blog': blog_id});
  }

  deleteBlog(blog_id: number) {
    let url = this.baseURL + 'blog' + '?id=' + blog_id;
    return this.http.delete<any>(url);
  }

  newBlog(data: { topic: any[]; name: string; description: string; isPublic: boolean }) {
    let topics: number[] = [];

    for(let i=0; i< data.topic.length; i++){
      topics.push(data.topic[i]['id']);
    }

    data.topic = topics;

    let url = this.baseURL + 'new_blog';
    return this.http.post<any>(url, data);
  }
}
