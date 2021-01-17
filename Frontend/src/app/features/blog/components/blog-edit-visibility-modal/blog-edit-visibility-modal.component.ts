import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-blog-edit-visibility-modal',
  templateUrl: './blog-edit-visibility-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-visibility-modal.component.css']
})
export class BlogEditVisibilityModalComponent implements OnInit {
  optionsAlert = {
    autoClose: true,
    keepAfterRouteChange: false
  };
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
    protected alertService: AlertService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
    this.isPublic = this.blog.isPublic;
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }

  updateBlog(): void{
    this.blog.isPublic = this.isPublic;
    this.blogService.updateBlog(this.blog).subscribe(
      data => {
        this.alertService.success("Successfully edited visibility.", this.optionsAlert);
        this.modalService.dismissAll(this.template);},
      error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.optionsAlert);
      }
    );
    this.blogService.getBlog().subscribe(data => { this.blog = data; });
  }

  clearData() {
    this.isPublic = this.blog.isPublic;
  }

}
