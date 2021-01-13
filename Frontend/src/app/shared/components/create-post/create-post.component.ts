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
  blog: Blog = null;

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
    this.postService.createPost(this.title, this.content, this.blog).subscribe(
      data => {
            if (this.blog != null) {
              this.blog.posts.push(data['post']);
            }
            this.modalService.dismissAll(this.template);
      }, error => {console.log(error)});
    this.clearData();
  }

  clearData(){
    this.title = "";
    this.content = "";
  }
}
