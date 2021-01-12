import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  blog: Blog;
  blog_id: number;


  constructor (
    private modalService: NgbModal,
    private blogService: BlogService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('num')) {
      this.blog_id = parseInt(this.route.snapshot.paramMap.get('num'));
      this.blogService.getBlog(this.blog_id).subscribe(data => { this.blog = data; });
    } else {
        this.blogService.getBlog().subscribe(data => { this.blog = data; });
    }
  }

  blog_follow() {
    this.blogService.blog_follow(this.blog.id).subscribe(data => { console.log(data);
      this.blogService.getBlog(this.blog.id).subscribe(data => { this.blog = data; });
    });
  }
}
