import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Blog} from "../../../../core/models/Blog";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogService} from "../../../../core/services/blog.service";

@Component({
  selector: 'app-blog-delete-modal',
  templateUrl: './blog-delete-modal.component.html',
  styleUrls: ['./blog-delete-modal.component.css']
})
export class BlogDeleteModalComponent implements OnInit {

  @Input()
  blog: Blog;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      backdropClass: 'light-blue-backdrop',
      windowClass: 'dark-modal',
      size: 'lg',
      centered: true
    });
  }

  // TODO: Redirect after deletion
  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog.id).subscribe(
      data => {console.log(data);
      },
      error => {console.log(error); }
    );
  }
}
