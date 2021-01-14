import {Component, HostListener, Input, OnInit, ViewChild} from '@angular/core';
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
  cols: number = 3;
  pageIndex:number = 0;
  pageSize:number = 6;
  lowValue:number = 0;
  highValue:number = 6;
  cur_page: number = 0;
  flag_2: boolean = false;
  flag_3: boolean = true;

  // MatPaginator Output
  pageEvent: PageEvent;

  blogs: Blog[] = [];

  @Input()
  hasPage: boolean = true;

  constructor(private mainService: MainPageService) { }

  ngOnInit(): void {
    this.mainService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
    if (window.innerWidth <= 1000) {
      this.cols = 2;
      this.pageSize = 4;
      this.highValue = 4;
    } else {
      this.cols = 3;
      this.pageSize = 6;
      this.highValue = 6;
    }
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 1500) {
      this.cols = 2;
      this.pageSize = 4;

      if (this.flag_2 == true){
        this.flag_2 = false;
      }
      this.lowValue = this.pageIndex * 4;
      this.highValue = this.pageIndex * 4 + 4;
    } else {
      this.cols = 3;
      this.pageSize = 6;

      if (this.flag_3 == true) {
        this.flag_3 = false;
      }
      this.lowValue = this.pageIndex * 6;
      this.highValue = this.pageIndex * 6 + 6;
    }
    console.log(this.highValue)
    console.log(this.lowValue)
  }

}
