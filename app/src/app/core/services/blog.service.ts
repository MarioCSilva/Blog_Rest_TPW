import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Blog} from '../models/Blog';
import {HttpClient} from '@angular/common/http';
import {Topic} from "../models/Topic";
import {BaseURL} from '../utils/base_url';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http: HttpClient) { }

  getBlog(blog_id?: number): Observable<Blog> {
    let url = BaseURL.baseURL + 'blog';
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
    const url = BaseURL.baseURL + 'blog?id=' + blog.id;
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
    const url = BaseURL.baseURL + 'topics';
    return this.http.get<Topic[]>(url);
  }

  blog_follow(blog_id): Observable<any> {
    const url = BaseURL.baseURL + 'blog_follow';
    return this.http.post<any>(url, {'blog': blog_id});
  }

  deleteBlog(blog_id: number) {
    let url = BaseURL.baseURL + 'blog' + '?id=' + blog_id;
    return this.http.delete<any>(url);
  }

  newBlog(data: { topic: any[]; name: string; description: string; isPublic: boolean}, blog_pic: File ) {
    let topics: number[] = [];

    for(let i=0; i< data.topic.length; i++){
      topics.push(data.topic[i]['id']);
    }

    data.topic = topics;
    const payload = new FormData();
    payload.append('data', JSON.stringify(data));
    if(blog_pic){
      payload.append('file', blog_pic);
    }
    let url = BaseURL.baseURL + 'blog';
    return this.http.post<any>(url, payload);

  }
}
