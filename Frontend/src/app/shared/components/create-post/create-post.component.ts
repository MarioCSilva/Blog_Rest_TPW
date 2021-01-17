import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PostService} from "../../../core/services/post.service";
import {BlogService} from "../../../core/services/blog.service";
import {Blog} from "../../../core/models/Blog";
import {AlertService} from "../../../_alert";

@Component({
  selector: 'app-create-post',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  title: string;
  content: string;
  pic_file: File;

  @Input()
  blog: Blog = null;

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    protected alertService: AlertService,
  ) { }


  ngOnInit(): void {
  }

  showModal(): void{
    // Adjust css
    this.modalService.open(this.template, {
      size: 'md',
      centered: true
    });
    this.clearData();
  }

  createPost(): void{
    this.postService.createPost(this.title, this.content, this.blog, this.pic_file).subscribe(
      data => {
            if (this.blog != null) {
              this.blog.posts.push(data['post']);
            }
        this.alertService.success("Successfully added a post", this.options);

        this.modalService.dismissAll(this.template);
      }, error => {
        this.alertService.error(error.error ? this.alertService.handleError(error.error) : error.message, this.options);
      });
    this.clearData();
  }

  clearData(){
    this.title = "";
    this.content = "";
  }

  file(event){
    const files = event.target.files;
    this.pic_file = files[0];
  }

}
