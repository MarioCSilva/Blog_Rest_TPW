import {Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Input} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {PostService} from "../../../core/services/post.service";
import {BlogService} from "../../../core/services/blog.service";
import {Blog} from "../../../core/models/Blog";

@Component({
  selector: 'app-create-post',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  title: string;
  content: string;

  @Input()
  blog: Blog;

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private postService: PostService,
    private blogService: BlogService,
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
    console.log(this.blog);
    this.postService.createPost(this.blog.id, this.title, this.content).subscribe(
      data => {console.log(data);
        this.blogService.getBlog(this.blog.id).subscribe(data => {
            this.blog.posts = data.posts;
          },
          error => {console.log(error);}
        );
        this.modalService.dismissAll(this.template);
    }, error => {console.log(error)});
    this.clearData();
  }

  clearData(){
    this.title = "";
    this.content = "";
  }
}
