import {Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Blog} from "../../../../core/models/Blog";
import {BlogService} from "../../../../core/services/blog.service";
import {Topic} from "../../../../core/models/Topic";

@Component({
  selector: 'app-blog-edit-topics-modal',
  templateUrl: './blog-edit-topics-modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./blog-edit-topics-modal.component.css']
})
export class BlogEditTopicsModalComponent implements OnInit {

  @Input()
  blog: Blog;

  topics: Topic[];

  @ViewChild('template', { static: true }) template: ElementRef;

  constructor(
    private modalService: NgbModal,
    private blogService: BlogService,
  ) {
    this.getTopics();
  }

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

  updateBlog(): void{
    this.blogService.updateBlog(this.blog).subscribe(
      data => {console.log(data);
        this.modalService.dismissAll(this.template);
        },
      error => {console.log(error); }
    );
  }

  getTopics(): void {
    this.blogService.getTopics().subscribe(
      data => {this.topics = data;},
      error => {console.log(error); }
    );
  }


  checkTopic(topic: Topic) {
    for(let i=0; i<this.blog.topic.length; i++){
      if (this.blog.topic[i].name == topic.name) {
        return true;
      }
    }
    return false;
  }

  selectTopic(topic, checked: boolean) {
    if (checked) {
      this.blog.topic.push(topic);
    } else {
      for (let i = this.blog.topic.length - 1; i >= 0; --i) {
        if (this.blog.topic[i].name == topic.name) {
          this.blog.topic.splice(i,1);
        }
      }
    }
    console.log(this.blog.topic);
  }
}
