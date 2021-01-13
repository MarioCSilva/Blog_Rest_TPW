import {Component, Input, OnInit} from '@angular/core';
import {MainPageService} from '../../../../core/services/main-page.service';
import {Blog} from '../../../../core/models/Blog';
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-main-blog-page',
  templateUrl: './main-blog-page.component.html',
  styleUrls: ['./main-blog-page.component.css']
})
export class MainBlogPageComponent implements OnInit {

  // MatPaginator Inputs
  pageIndex:number = 0;
  pageSize:number = 6;
  lowValue:number = 0;
  highValue:number = 6;

  // MatPaginator Output
  pageEvent: PageEvent;

  blogs: Blog[];

  @Input()
  hasPage: boolean = true;

  constructor(private mainService: MainPageService) { }

  ngOnInit(): void {
    this.mainService.getBlogs().subscribe(data => {
      this.blogs = data;
      console.log(this.blogs);
    });
  }

  getPaginatorData(event){
    if(event.pageIndex === this.pageIndex + 1){
      this.lowValue = this.lowValue + this.pageSize;
      this.highValue =  this.highValue + this.pageSize;
    }
    else if(event.pageIndex === this.pageIndex - 1){
      this.lowValue = this.lowValue - this.pageSize;
      this.highValue =  this.highValue - this.pageSize;
    }
    this.pageIndex = event.pageIndex;
    return event;
  }

}
