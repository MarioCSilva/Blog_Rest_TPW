import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Blog} from "../../../../core/models/Blog";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {BlogService} from "../../../../core/services/blog.service";
import {Router} from "@angular/router";

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
    private router: Router,
  ) { }

  @ViewChild('template', { static: true }) template: ElementRef;

  ngOnInit(): void {
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'lg',
      centered: true
    });
  }

  deleteBlog(): void {
    this.blogService.deleteBlog(this.blog.id).subscribe(
      data => {
        this.router.navigate(['/home']);
      },
      error => {console.log(error); }
    );
  }
}
