import { Component, OnInit } from '@angular/core';
import {MainPageService} from '../../../../core/services/main-page.service';
import {Post} from '../../../../core/models/Post';

@Component({
  selector: 'app-main-posts-page',
  templateUrl: './main-posts-page.component.html',
  styleUrls: ['./main-posts-page.component.css']
})
export class MainPostsPageComponent implements OnInit {

  posts: Post[];

  constructor(private mainService: MainPageService) { }

  ngOnInit(): void {
    this.mainService.getPosts().subscribe(data => {console.log(data); this.posts = data; });
  }
}
