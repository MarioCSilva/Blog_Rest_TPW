import {Component, ElementRef, HostListener, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
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
  name: string;
  description: string;

  ngOnInit(): void {
    this.name = this.blog.name;
    this.description = this.blog.description;
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
    this.blog.name = this.name;
    this.blog.description = this.description;
    this.blogService.updateBlog(this.blog).subscribe(
      data => {console.log(data);this.modalService.dismissAll(this.template);},
    error => {
        console.log(error);
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
