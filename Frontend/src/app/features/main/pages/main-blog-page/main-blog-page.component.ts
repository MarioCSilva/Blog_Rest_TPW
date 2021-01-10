import { Component, OnInit } from '@angular/core';
import {MainPageService} from '../../../../core/services/main-page.service';
import {Blog} from '../../../../core/models/Blog';

@Component({
  selector: 'app-main-blog-page',
  templateUrl: './main-blog-page.component.html',
  styleUrls: ['./main-blog-page.component.css']
})
export class MainBlogPageComponent implements OnInit {

  blogs: Blog[];
  constructor(private mainService: MainPageService) { }

  ngOnInit(): void {
    this.mainService.getBlogs().subscribe(data => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }

}
