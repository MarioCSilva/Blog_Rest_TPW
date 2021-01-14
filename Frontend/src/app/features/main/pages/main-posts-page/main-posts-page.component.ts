import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from '../../../../core/services/main-page.service';
import {Post} from '../../../../core/models/Post';
import {Blog} from "../../../../core/models/Blog";

@Component({
  selector: 'app-main-posts-page',
  templateUrl: './main-posts-page.component.html',
  styleUrls: ['./main-posts-page.component.css']
})
export class MainPostsPageComponent implements OnInit {

  posts: Post[];

  @Input()
  hasPage: boolean = true;

  @Input()
  blog: Blog = null;

  constructor(private mainService: MainPageService) { }

  ngOnInit(): void {
    this.mainService.getPosts().subscribe(data => {this.posts = data; });
  }
}
