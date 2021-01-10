import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";

@Component({
  selector: 'app-blog-edit-visibility-modal',
  templateUrl: './blog-edit-visibility-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-visibility-modal.component.css']
})
export class BlogEditVisibilityModalComponent implements OnInit {

  @Input()
  blog: Blog;
  isPublic: boolean;

  options = [
    { value: true, text: 'Public' },
    { value: false, text: 'Private' },
  ];

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
    this.isPublic = this.blog.isPublic;
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
    this.blog.isPublic = this.isPublic;
    this.blogService.updateBlog(this.blog).subscribe(
      data => {console.log(data);this.modalService.dismissAll(this.template);},
      error => {console.log(error); }
    );
    this.blogService.getBlog().subscribe(data => { this.blog = data; });
  }

  clearData() {
    this.isPublic = this.blog.isPublic;
  }

}
