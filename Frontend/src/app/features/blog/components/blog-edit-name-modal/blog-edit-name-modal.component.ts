import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {AlertService} from "../../../../_alert";

@Component({
  selector: 'app-blog-edit-name-modal',
  templateUrl: './blog-edit-name-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-name-modal.component.css']
})
export class BlogEditNameModalComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  constructor(private modalService: NgbModal,
              private blogService: BlogService,
              protected alertService: AlertService,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  @Input()
  blog: Blog;
  name: string;
  description: string;

  ngOnInit(): void {
    this.name = this.blog.name;
    this.description = this.blog.description;
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }

  updateBlog(): void{
    this.blog.name = this.name;
    this.blog.description = this.description;
    this.blogService.updateBlog(this.blog).subscribe(
      data => {
        this.alertService.success("Successfully updated the blog.", this.options);
        this.modalService.dismissAll(this.template);},
    error => {
      this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);

      this.blogService.getBlog(this.blog.id).subscribe(data => {
        this.blog.description = data.description;
        this.blog.name = data.name;
        this.clearData()});
      }
    );
  }

  clearData() {
    this.name = this.blog.name;
    this.description = this.blog.description;
  }
}
