import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {StorageService} from "../../../../core/services/storage.service";

@Component({
  selector: 'app-blog-edit-name-modal',
  templateUrl: './blog-edit-name-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-name-modal.component.css']
})
export class BlogEditNameModalComponent implements OnInit {

  constructor(private modalService: NgbModal,
              private blogService: BlogService) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  @Input()
  blog: Blog;

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

  // TODO: handle errors and show them on html
  updateBlog(): void{
    this.blogService.updateBlogName(this.blog).subscribe(
      data => {console.log(data) },
    error => {console.log(error); }
    );
  }

}
