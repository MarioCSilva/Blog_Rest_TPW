import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
    this.blog_id = parseInt(this.route.snapshot.paramMap.get('num'));
    this.getBlog(this.blog_id);
  }

  getBlog(blog_id): void {
    this.blogService.getBlog(blog_id).subscribe(data => { this.blog = data; });
  }

}
